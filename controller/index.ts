import { Service } from 'typedi';
import HealthController from './health';
import Services from '../service';
import { Controller } from './base';

@Service()
class Controllers {
    healthController: Controller;

    constructor(private readonly services: Services) {
        this.healthController = new HealthController();
    }

    getAll(): Controller[] {
        return [this.healthController];
    }
}
export default Controllers;
