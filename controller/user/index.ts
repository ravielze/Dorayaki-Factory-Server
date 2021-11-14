import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import UserService from '../../service/user';
import { BaseController, Controller } from '../base';

@Service()
class UserController extends BaseController implements Controller {
    basePath = '/auth';

    constructor(private readonly service: UserService) {
        super();
        this.basePath = '/auth';
        this.router.get('/', this.test.bind(this));
    }

    test(req: Request, res: Response) {
        res.json(CreateResponse(ResponseStatus.OK, 'test'));
    }
}

export default UserController;
