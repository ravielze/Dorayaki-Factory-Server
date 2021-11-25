import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import InboundService from '../../service/inbound';
import { BaseController, Controller } from '../base';

@Service()
class InboundController extends BaseController implements Controller {
    basePath = '/inbound';

    constructor(private readonly service: InboundService) {
        super();
        this.router.get('/', AsyncHandler(this.something.bind(this)));
    }

    async something(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK));
    }
}

export default InboundController;
