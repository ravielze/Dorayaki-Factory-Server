import { Service } from 'typedi';
import { Connection, ConnectionManager, EntityTarget, Repository } from 'typeorm';
import Config from '../app/config';
import { User } from '../model/dao/user';

@Service()
class DatabaseConnection {
    private readonly connectionManager: ConnectionManager = new ConnectionManager();
    private connection: Connection;

    constructor(private readonly config: Config) {
        console.info('🧷 Preparing database connection...');
        this.connection = this.connectionManager.create({
            type: 'mysql',
            host: config.databaseHost,
            port: config.databasePort,
            username: config.databaseUsername,
            password: config.databasePassword,
            database: config.databaseName,
            entities: [User],
        });
    }

    isConnected(): boolean {
        return this.connection.isConnected;
    }

    async connect() {
        if (!this.isConnected()) {
            console.info('📕 Connecting to database...');
            await this.connection.connect();
            console.info('📗 Connected to database');
            console.info('📲 Synchronizing model...');
            await this.connection.synchronize();
            console.info('📱 Model synchronized');
        }
    }

    getRepository<T>(target: EntityTarget<T>): Repository<T> {
        try {
            return this.connectionManager.get().getRepository(target);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default DatabaseConnection;
