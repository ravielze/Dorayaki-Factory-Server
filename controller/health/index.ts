import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { BaseController, Controller } from '../base';

@Service()
class HealthController extends BaseController implements Controller {
    basePath = '/health';

    constructor() {
        super();
        this.router.get('/', this.checkHealth.bind(this));
    }

    checkHealth(req: Request, res: Response) {
        res.return(CreateResponse(ResponseStatus.OK, 'ok'));
    }
}

export default HealthController;
