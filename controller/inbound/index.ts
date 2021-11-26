import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { ParseIntOrDefault, ParseInt } from '../../common/parser';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import InboundService from '../../service/inbound';
import { BaseController, Controller } from '../base';
import { PaginationResult } from '../../model/dto/abstract';
import { ConvertInbound, InboundDTO } from '../../model/dto/inbound';
import UserMiddleware from '../user/middleware';
import { CreateInboundDTO } from '../../model/dto/inbound/create';
import { validate } from '../../common/validation';
import { InboundStatus } from '../../common/inboundStatus';

@Service()
class InboundController extends BaseController implements Controller {
    basePath = '/inbound';

    constructor(private readonly service: InboundService, private readonly mw: UserMiddleware) {
        super();
        this.router.get(
            '/',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.getAll.bind(this))
        );
        this.router.post(
            '/',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.createInbound.bind(this))
        );
        this.router.post(
            '/receive/:id',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.receive.bind(this))
        );
    }

    async something(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK));
    }

    async createInbound(req: Request, res: Response) {
        const item: CreateInboundDTO = new CreateInboundDTO(req.body);
        await validate(item);

        const result = await this.service.createInbound(req, item);
        res.return(CreateResponse(ResponseStatus.OK, ConvertInbound(result)));
    }

    async getAll(req: Request, res: Response) {
        const page: number = ParseIntOrDefault(1, req.query.page as string | undefined, 'Page');
        const itemPerPage: number = ParseIntOrDefault(
            10,
            req.query.items_per_page as string | undefined,
            'ItemsPerPage'
        );
        const result = await this.service.getInbounds(req, page, itemPerPage);
        const resultDto: PaginationResult<InboundDTO> = {
            ...result,
            items: result.items.map((i) => ConvertInbound(i)),
        };
        res.return(CreateResponse(ResponseStatus.OK, resultDto));
    }

    async receive(req: Request, res: Response) {
        const id: number = ParseInt(req.params.id as string | undefined, 'InboundID');

        const result = await this.service.updateStatus(req, id, InboundStatus.RECEIVED);

        res.return(CreateResponse(ResponseStatus.OK, ConvertInbound(result)));
    }
}

export default InboundController;
