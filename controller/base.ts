import { Router } from 'express';
export abstract class BaseController {
    public router: Router;
    basePath = '/';

    constructor() {
        this.router = Router();
    }
}

export interface Controller {
    basePath: string;
    router: Router;
}
