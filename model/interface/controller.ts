import { Router } from 'express';

export default interface Controller {
    basePath: string;
    router: Router;
}
