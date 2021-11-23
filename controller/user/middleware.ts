import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import UserController from '.';
import Config from '../../app/config';
import { UserControllerError } from './error';

@Service()
class UserMiddleware {
    isAuthorized;
    hasAPIKeyOrIsAuthorized;
    hasAPIKey;

    constructor(private readonly userController: UserController, private readonly config: Config) {
        this.isAuthorized = this.userController.getAuthMiddleware.bind(this.userController);
        this.hasAPIKeyOrIsAuthorized = this.__hasAPIKeyOrIsAuthorized.bind(this);
        this.hasAPIKey = this.__hasAPIKey.bind(this);
    }

    private __hasAPIKeyOrIsAuthorized(): (req: Request, res: Response, next: NextFunction) => void {
        return async (req: Request, res: Response, next: NextFunction) => {
            let isAuthorizedOK = true;
            let hasAPIKeyOK = true;

            await this.hasAPIKey()(req, res, (err) => {
                if (err) {
                    hasAPIKeyOK = false;
                }
            });
            await this.isAuthorized()(req, res, (err) => {
                if (err) {
                    isAuthorizedOK = false;
                }
            });

            if (isAuthorizedOK || hasAPIKeyOK) {
                return next();
            } else {
                return next(UserControllerError.BOTH_NOT_FOUND_OR_VALID);
            }
        };
    }

    private __hasAPIKey(): (req: Request, res: Response, next: NextFunction) => void {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (!req.headers.authorization) {
                return next(UserControllerError.API_KEY_NOT_FOUND);
            }

            const authString: string = req.headers.authorization;
            if (!(authString.startsWith('APIKEY') || authString.trim().length > 0)) {
                return next(UserControllerError.API_KEY_NOT_VALID);
            }

            const splitBearer: string[] = authString.split('APIKEY ');
            let token: string | undefined = undefined;
            if (splitBearer.length == 2) {
                token = splitBearer[1];
            } else if (authString.startsWith('eyJh')) {
                token = authString;
            }

            if (token && token.trim() === this.config.apiKey.trim()) {
                return next();
            } else {
                return next(UserControllerError.API_KEY_NOT_VALID);
            }
        };
    }
}

export default UserMiddleware;
