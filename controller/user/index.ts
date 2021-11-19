import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { RegisterDTO } from '../../model/dto/user';
import { CreateValidationErrorResponse } from '../../model/dto/validation';
import UserService from '../../service/user';
import { BaseController, Controller } from '../base';
import AsyncHandler from 'express-async-handler';

@Service()
class UserController extends BaseController implements Controller {
    basePath = '/auth';

    constructor(private readonly service: UserService) {
        super();
        this.basePath = '/auth';
        this.router.get('/', this.test.bind(this));
        this.router.post('/register', AsyncHandler(this.register.bind(this)));
    }

    test(req: Request, res: Response) {
        res.status(200).json(CreateResponse(ResponseStatus.OK, 'test'));
    }

    async register(req: Request, res: Response) {
        const item: RegisterDTO = new RegisterDTO(req.body);
        CreateValidationErrorResponse(await validate(item));
        await this.testWait();
        res.status(200).json(CreateResponse(ResponseStatus.OK, item));
    }

    async testWait() {
        return new Promise<boolean>((res, rej) => {
            try {
                setTimeout(() => res(true), 5000);
            } catch {
                rej(false);
            }
        });
    }
}

export default UserController;
