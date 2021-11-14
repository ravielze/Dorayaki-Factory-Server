import { Request, Response } from 'express';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { BaseController, Controller } from '../base';

class HealthController extends BaseController implements Controller {
    basePath = '/health';

    constructor() {
        super();
        this.router.get('/', this.checkHealth);
    }

    checkHealth(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK, 'ok'));
    }
}

export default HealthController;
