import express, { Application } from 'express';
import Helmet from 'helmet';
import Container, { Service } from 'typedi';
import Controllers from '../controller';
import 'reflect-metadata';
import DatabaseConnection from '../database';
import Config from './config';
import { ErrorMiddleware, RequestResponseManipulator } from './middleware';

@Service()
class App {
    expressApplication?: Application;
    private controllers?: Controllers;

    constructor(private readonly database: DatabaseConnection, private readonly config: Config) {
        console.info('🔈 Starting Application...');
        this.expressApplication = express();
    }

    private install() {
        this.controllers = Container.get(Controllers);
        if (!this.controllers || !this.expressApplication) {
            throw new Error('😵 Cannot Instantiate Controllers!');
        }

        console.info('🚄 Routing...');
        this.expressApplication.use(express.json({ strict: true }));
        this.expressApplication.use(Helmet());
        this.expressApplication.use(RequestResponseManipulator);
        const controllers = this.controllers.getAll();
        for (const c of controllers) {
            if (!c.basePath.startsWith('/')) {
                continue;
            }

            console.info(`\t🔗 ${c.constructor.name.replace('Controller', '')} Routes`);
            this.expressApplication.use(`/api${c.basePath}`, c.router);
            c.infoRoutes();
        }

        this.expressApplication.use(ErrorMiddleware);
    }

    async run() {
        await this.database.connect();
        this.install();
        try {
            this.expressApplication?.listen(this.config.serverPort, (): void => {
                console.info('🔊 Application started');
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default App;
