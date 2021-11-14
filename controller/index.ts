import Container, { Service } from 'typedi';
import HealthController from './health';
import { BaseController, Controller } from './base';
import UserController from './user';

@Service()
class Controllers {
    healthController: Controller;
    userController: Controller;

    constructor() {
        this.healthController = Container.get(HealthController);
        this.userController = Container.get(UserController);
    }

    getAll(): Controller[] {
        const allControllers = Object.values(this).filter((item) => {
            return item instanceof BaseController;
        });
        return allControllers;
    }
}
export default Controllers;
