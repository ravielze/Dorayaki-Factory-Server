import { Router } from 'express';
import { MethodFormat } from '../common/string';

interface Route {
    path: string;
    method: string;
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
                each.route.stack.forEach((endpoint: { method: string }) => {
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

            let aVal: number = order[a.method];
            let bVal: number = order[b.method];
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
            console.info(`\t\t${MethodFormat(item.method)} ${item.path}`);
        });
    }
}
export interface Controller {
    basePath: string;
    router: Router;
    infoRoutes: () => void;
}
