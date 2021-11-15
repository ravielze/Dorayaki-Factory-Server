import { Service } from 'typedi';
import { Connection, createConnection, EntityTarget, Repository } from 'typeorm';
import Config from '../app/config';
import { DorayakiDAO } from '../model/dao/dorayaki';
import { InboundDAO } from '../model/dao/inbound';
import { IngredientDAO } from '../model/dao/ingredient';
import { RecipeDAO } from '../model/dao/recipe';
import { UserDAO } from '../model/dao/user';

@Service()
class DatabaseConnection {
    private connection?: Connection;

    constructor(private readonly config: Config) {}

    isConnected(): boolean {
        return !!this.connection;
    }

    async connect() {
        if (!this.connection) {
            console.info('📕 Connecting to database...');
            this.connection = await createConnection({
                type: 'mysql',
                host: this.config.databaseHost,
                port: this.config.databasePort,
                username: this.config.databaseUsername,
                password: this.config.databasePassword,
                database: this.config.databaseName,
                entities: [UserDAO, DorayakiDAO, InboundDAO, IngredientDAO, RecipeDAO],
            });
            console.info('📗 Connected to database');
            console.info('📲 Synchronizing model...');
            await this.connection.synchronize();
            console.info('📱 Model synchronized');
        }
    }

    getRepository<T>(target: EntityTarget<T>): Repository<T> {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }

        try {
            return this.connection.getRepository(target);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default DatabaseConnection;
