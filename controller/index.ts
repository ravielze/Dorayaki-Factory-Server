import { Service } from 'typedi';
import HealthController from './health';
import IController from '../model/interface/controller';

@Service()
class Controllers {
    healthController: IController = new HealthController();

    getAll(): IController[] {
        return [this.healthController];
    }
}
export default Controllers;
