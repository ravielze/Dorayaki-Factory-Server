import { Service } from 'typedi';
import { Connection, createConnection, EntitySchema, EntityTarget, Repository } from 'typeorm';
import Config from '../app/config';
import { DorayakiDAO } from '../model/dao/dorayaki';
import { InboundDAO } from '../model/dao/inbound';
import { IngredientDAO } from '../model/dao/ingredient';
import { RecipeDAO } from '../model/dao/recipe';
import { UserDAO } from '../model/dao/user';

interface BaseConnectionOptions {
    type: 'mysql' | 'mariadb' | 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    entities: (Function | string | EntitySchema<any>)[];
}

@Service()
class DatabaseConnection {
    private connection?: Connection;

    constructor(private readonly config: Config) {}

    isConnected(): boolean {
        return !!this.connection;
    }

    async close() {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }
        await this.connection.close();
    }

    async connect(overrideLog?: boolean) {
        if (!overrideLog) {
            overrideLog = false;
        }

        if (!this.connection) {
            console.info('📕 Connecting to database...');

            const connectionOptions: BaseConnectionOptions = {
                type: 'mysql',
                host: this.config.databaseHost,
                port: this.config.databasePort,
                username: this.config.databaseUsername,
                password: this.config.databasePassword,
                database: this.config.databaseName,
                entities: [UserDAO, DorayakiDAO, InboundDAO, IngredientDAO, RecipeDAO],
            };

            if (this.config.databaseQueryLog || overrideLog) {
                this.connection = await createConnection({
                    ...connectionOptions,
                    logging: ['migration', 'error', 'query'],
                });
            } else {
                this.connection = await createConnection(connectionOptions);
            }
            console.info('📗 Connected to database');
        }
    }

    async autoMigrate() {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }

        console.info('📲 Synchronizing model...');
        await this.connection.synchronize();
        console.info('📱 Model synchronized');
        await this.connection.close();
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
