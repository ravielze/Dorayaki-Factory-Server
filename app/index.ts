import express, { Application } from 'express';
import Helmet from 'helmet';
import { Service } from 'typedi';
import Controllers from '../controller';
import 'reflect-metadata';
import DatabaseConnection from '../database';
import Config from './config';

@Service()
class App {
    expressApplication?: Application;

    constructor(
        private readonly controllers: Controllers,
        private readonly database: DatabaseConnection,
        private readonly config: Config
    ) {
        this.expressApplication = express();
        this.expressApplication.use(express.json());
        this.expressApplication.use(Helmet());
        this.controllers = controllers;
        this.install();
    }

    private install() {
        if (!this.controllers) {
            return;
        }

        const controllers = this.controllers.getAll();
        for (const c of controllers) {
            this.expressApplication?.use(c.basePath, c.router);
        }
    }

    run() {
        try {
            this.expressApplication?.listen(this.config.serverPort, (): void => {
                console.log('Application started');
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default App;
