import { Service } from 'typedi';
import { Connection, ConnectionManager } from 'typeorm';
import Config from '../app/config';

@Service()
class DatabaseConnection {
    private readonly connectionManager: ConnectionManager = new ConnectionManager();
    private connection: Connection;

    constructor(private readonly config: Config) {
        this.connection = this.connectionManager.create({
            type: 'mysql',
            host: config.databaseHost,
            port: config.databasePort,
            username: config.databaseUsername,
            password: config.databasePassword,
            database: config.databaseName,
        });
        this.connect();
    }

    isConnected(): boolean {
        return this.connection.isConnected;
    }

    async connect() {
        if (!this.isConnected()) {
            await this.connection.connect();
            console.log('connected!!!');
        }
    }
}

export default DatabaseConnection;
