import { Router } from 'express';
import { MethodFormat } from '../common/string';

interface Route {
    path: any;
    method: any;
}

export abstract class BaseController {
    public router: Router;
    basePath = '/';

    constructor() {
        this.router = Router();
    }

    infoRoutes() {
        const routes: Route[] = [];
        this.router.stack.forEach((each) => {
            if (each.route && each.route.path) {
                const path = each.route.path;
                each.route.stack.forEach((endpoint: any) => {
                    if (endpoint && endpoint.method) {
                        routes.push({
                            method: endpoint.method.toLowerCase(),
                            path: path,
                        });
                    }
                });
            }
        });

        routes.sort((a: Route, b: Route) => {
            const order: { [key: string]: number } = {
                get: 3,
                post: 2,
                patch: 1,
                put: 0,
                delete: -1,
            };

            var aVal: number = order[a.method];
            var bVal: number = order[b.method];
            if (aVal === undefined) {
                aVal = -2;
            }
            if (bVal === undefined) {
                bVal = -2;
            }

            if (aVal === bVal) {
                return a.path.localeCompare(b.path);
            }
            return bVal - aVal;
        });

        routes.forEach((item) => {
            const m: string = item.method;
            console.info(`\t\t${MethodFormat(m)} ${item.path}`);
        });
    }
}
export interface Controller {
    basePath: string;
    router: Router;
    infoRoutes: () => void;
}
