import { Router } from 'express';
export abstract class BaseController {
    public router: Router = Router();
}

export interface Controller {
    basePath: string;
    router: Router;
}
