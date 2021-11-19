import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { BaseController, Controller } from '../base';

@Service()
class TemplateController extends BaseController implements Controller {
    basePath = '/health';

    constructor() {
        super();
        this.router.get('/', this.something.bind(this));
    }

    something(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK, 'ok'));
    }
}

export default TemplateController;
