import Container, { Service } from 'typedi';
import HealthController from './health';
import { BaseController, Controller } from './base';
import UserController from './user';
import FileController from './file';
import IngredientController from './ingredient';
import DorayakiController from './dorayaki';

@Service()
class Controllers {
    healthController: Controller;
    userController: Controller;
    fileController: Controller;
    ingredientController: Controller;
    dorayakiController: Controller;

    constructor() {
        this.healthController = Container.get(HealthController);
        this.userController = Container.get(UserController);
        this.fileController = Container.get(FileController);
        this.ingredientController = Container.get(IngredientController);
        this.dorayakiController = Container.get(DorayakiController);
    }

    getAll(): Controller[] {
        const allControllers = Object.values(this).filter((item) => {
            return item instanceof BaseController;
        });
        return allControllers;
    }
}
export default Controllers;
