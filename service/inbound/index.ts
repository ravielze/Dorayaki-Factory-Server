import { Request } from 'express';
import { Service } from 'typedi';
import { InboundStatus } from '../../common/inboundStatus';
import { InboundDAO } from '../../model/dao/inbound';
import { PaginationResult } from '../../model/dto/abstract';
import { CreateInboundDTO } from '../../model/dto/inbound/create';
import InboundRepository from '../../repository/inbound';
import DorayakiService from '../dorayaki';
import IngredientService from '../ingredient';
import { InboundServiceError } from './error';

@Service()
class InboundService {
    constructor(
        private readonly repo: InboundRepository,
        private readonly doraService: DorayakiService,
        private readonly ingrService: IngredientService
    ) {}
    async createInbound(req: Request, item: CreateInboundDTO): Promise<InboundDAO> {
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

    async updateStatus(req: Request, id: number, status: InboundStatus): Promise<InboundDAO> {
        if (status === InboundStatus.RECEIVED) {
            await this.repo.receive(req, id);
        }
        const result = await this.repo.getInbound(req, id);
        if (!result) {
            throw new Error('Imposible step deteceted');
        }
        return result;
    }
}

export default InboundService;
