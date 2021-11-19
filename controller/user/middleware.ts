import { Service } from 'typedi';
import UserController from '.';

@Service()
class UserMiddleware {
    isAuthorized;

    constructor(private readonly userController: UserController) {
        this.isAuthorized = this.userController.getAuthMiddleware.bind(this.userController);
    }
}

export default UserMiddleware;
