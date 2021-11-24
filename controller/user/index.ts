import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import UserService from '../../service/user';
import { BaseController, Controller } from '../base';
import AsyncHandler from 'express-async-handler';
import { RegisterDTO } from '../../model/dto/user/register';
import { ConvertUser } from '../../model/dto/user';
import { LoginDTO } from '../../model/dto/user/login';
import { UserControllerError } from './error';
import { validate } from '../../common/validation';

@Service()
class UserController extends BaseController implements Controller {
    basePath = '/auth';

    constructor(private readonly service: UserService) {
        super();
        this.basePath = '/auth';
        this.router.get('/', AsyncHandler(this.whoAmI.bind(this)));
        this.router.post('/register', AsyncHandler(this.register.bind(this)));
        this.router.post('/login', AsyncHandler(this.login.bind(this)));
    }

    async whoAmI(req: Request, res: Response) {
        const jwtToken: string = this.getUnvalidatedToken(req);

        const result = await this.service.whoAmI(req, jwtToken);
        res.return(CreateResponse(ResponseStatus.OK, ConvertUser(result)));
    }

    async register(req: Request, res: Response) {
        const item: RegisterDTO = new RegisterDTO(req.body);
        await validate(item);

        const result = await this.service.register(req, item);
        res.return(CreateResponse(ResponseStatus.OK, ConvertUser(result)));
    }

    async login(req: Request, res: Response) {
        const item: LoginDTO = new LoginDTO(req.body);
        await validate(item);

        const result = await this.service.login(req, item);
        res.return(CreateResponse(ResponseStatus.OK, { token: result.token }));
    }

    getAuthMiddleware(): (req: Request, res: Response, next: NextFunction) => void {
        const getUnvalidatedToken = this.getUnvalidatedToken.bind(this);
        const whoAmIService = this.service.whoAmI.bind(this.service);
        return async (req: Request, res: Response, next: NextFunction) => {
            req.userLoggedIn = undefined;
            try {
                const jwtToken: string = getUnvalidatedToken(req);
                const user = await whoAmIService(req, jwtToken);
                req.userLoggedIn = user;
                next();
            } catch (error) {
                next(error);
            }
        };
    }

    private getUnvalidatedToken(req: Request): string {
        if (!req.headers.authorization) {
            throw UserControllerError.BEARER_TOKEN_NOT_FOUND;
        }

        const authString: string = req.headers.authorization;

        if (!(authString.startsWith('Bearer') || authString.trim().length > 0)) {
            throw UserControllerError.BEARER_TOKEN_NOT_VALID;
        }

        const splitBearer: string[] = authString.split('Bearer ');
        let token: string | undefined = undefined;
        if (splitBearer.length == 2) {
            token = splitBearer[1];
        } else if (authString.startsWith('eyJh')) {
            token = authString;
        }

        if (token) {
            return token.trim();
        } else {
            throw UserControllerError.BEARER_TOKEN_NOT_VALID;
        }
    }
}

export default UserController;
