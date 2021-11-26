import * as dotenv from 'dotenv';
import { Service } from 'typedi';
import { ParseBoolean } from '../common/parser';

@Service()
class Config {
    serverPort: number;
    databaseName: string;
    databaseHost: string;
    databasePort: number;
    databaseUsername: string;
    databasePassword: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    imgBBApiKey: string;
    imgExpiration: string;
    apiKey: string;
    databaseQueryLog: boolean;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;

    constructor() {
        dotenv.config();
        this.serverPort = parseInt(process.env.SERVER_PORT || '3000');
        this.databaseName = process.env.DB_NAME || 'tubes2_wbd';
        this.databaseHost = process.env.DB_HOST || 'localhost';
        this.databasePort = parseInt(process.env.DB_PORT || '3306');
        this.databaseUsername = process.env.DB_USERNAME || 'root';
        this.databasePassword = process.env.DB_PASSWORD || 'password';
        this.jwtSecret = process.env.JWT_SECRET || 'jwt_secr333t_wbd2';
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
        this.imgBBApiKey = process.env.IMGBB_API_KEY || '';
        this.imgExpiration = process.env.IMG_EXPIRATION || '86400';
        if (!this.imgBBApiKey) {
            throw new Error('Environment Variables: IMGBB_API_KEY is required.');
        }
        this.apiKey = process.env.API_KEY || 'akucintasabuuun<3';

        if (!process.env.DB_QUERY_LOG) {
            process.env.DB_QUERY_LOG = 'true';
        }
        this.databaseQueryLog = ParseBoolean(process.env.DB_QUERY_LOG);

        this.smtpHost = process.env.SMTP_HOST || 'smtp.ethereal.email';
        this.smtpPort = 587;
        this.smtpUser = process.env.SMTP_AUTH_USER || '';
        this.smtpPass = process.env.SMTP_AUTH_PASSWORD || '';
        if (!this.smtpUser || !this.smtpPass) {
            throw new Error('Environment Variables: SMTP User/Password is not set.');
        }
    }
}

export default Config;
