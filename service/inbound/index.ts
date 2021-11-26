import { Request } from 'express';
import { Service } from 'typedi';
import { InboundStatus } from '../../common/inboundStatus';
import { DorayakiDAO } from '../../model/dao/dorayaki';
import { InboundDAO } from '../../model/dao/inbound';
import { IngredientDAO } from '../../model/dao/ingredient';
import { PaginationResult } from '../../model/dto/abstract';
import { CreateInboundDTO } from '../../model/dto/inbound/create';
import InboundRepository from '../../repository/inbound';
import DorayakiService from '../dorayaki';
import { DorayakiServiceError } from '../dorayaki/error';
import IngredientService from '../ingredient';
import { IngredientServiceError } from '../ingredient/error';
import MailService from '../mail';
import { InboundServiceError } from './error';

@Service()
class InboundService {
    constructor(
        private readonly repo: InboundRepository,
        private readonly doraService: DorayakiService,
        private readonly ingrService: IngredientService,
        private readonly mailService: MailService
    ) {}
    async createInbound(req: Request, item: CreateInboundDTO): Promise<InboundDAO> {
        await this.mailService.sendMail(
            req,
            'Request Baru',
            'Ada request baru nih dari toko? Apa tuch? Yuk dicek...'
        );
        return this.repo.saveInbound(req, item.ToDAO());
    }
    async getInbounds(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<PaginationResult<InboundDAO>> {
        const result = await this.repo.getAllInbounds(req, page, itemPerPage);

        if (page != 1 && page > result.maxPage) {
            throw InboundServiceError.PAGE_NOT_FOUND;
        }

        if (result.maxPage < 1) {
            result.maxPage = 1;
        }

        return result;
    }

    async fulfillRequest(req: Request, item: InboundDAO) {
        const dorayaki: DorayakiDAO | undefined = await this.doraService.getDorayaki(
            req,
            item.dorayaki.id
        );
        if (!dorayaki) {
            throw DorayakiServiceError.DORAYAKI_ID_NOT_FOUND;
        }

        const updateIngredients: IngredientDAO[] = [];
        dorayaki.recipes.forEach((r) => {
            if (r.ingredient.stock < r.amount) {
                throw IngredientServiceError.INGREDIENT_OUT_OF_STOCK(r.ingredient, r.amount);
            }
            r.ingredient.stock -= r.amount;
            updateIngredients.push(r.ingredient);
        });

        await this.ingrService.saveIngredients(req, updateIngredients);
    }

    async updateStatus(req: Request, id: number, status: InboundStatus): Promise<InboundDAO> {
        const item: InboundDAO | undefined = await this.repo.getInbound(req, id);
        if (!item) {
            throw InboundServiceError.INBOUND_ID_NOT_FOUND;
        }

        const ok =
            (item.status === InboundStatus.REQUESTING &&
                (status === InboundStatus.ACCEPTED || status === InboundStatus.REJECTED)) ||
            (item.status === InboundStatus.ACCEPTED && status === InboundStatus.RECEIVED);

        if (ok) {
            await this.repo.updateStatus(req, id, status);
        } else {
            throw InboundServiceError.STATUS_NOT_VALID(item.status);
        }

        item.status = status;
        return item;
    }
}

export default InboundService;
