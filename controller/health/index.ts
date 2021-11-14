import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { BaseController, Controller } from '../base';

@Service()
class HealthController extends BaseController implements Controller {
    basePath = '/health';

    constructor() {
        super();
        this.basePath = '/health';
        this.router.get('/', this.checkHealth);
    }

    checkHealth(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK, 'ok'));
    }
}

export default HealthController;
