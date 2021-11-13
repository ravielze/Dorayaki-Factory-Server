import * as dotenv from 'dotenv';
import { Service } from 'typedi';

@Service()
class Config {
    serverPort: number;
    databaseName: string;
    databaseHost: string;
    databasePort: number;
    databaseUsername: string;
    databasePassword: string;

    constructor() {
        dotenv.config();
        this.serverPort = parseInt(process.env.SERVER_PORT || '3000');
        this.databaseName = process.env.DB_NAME || 'tubes2_wbd';
        this.databaseHost = process.env.DB_HOST || 'localhost';
        this.databasePort = parseInt(process.env.DB_PORT || '3306');
        this.databaseUsername = process.env.DB_USERNAME || 'root';
        this.databasePassword = process.env.DB_PASSWORD || 'password';
    }
}

export default Config;
