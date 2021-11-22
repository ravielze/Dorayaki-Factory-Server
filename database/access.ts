import {
    EntityManager,
    EntityTarget,
    getConnection,
    getManager,
    QueryRunner,
    Repository,
} from 'typeorm';

export class AccessManager {
    isTransaction: boolean;
    queryRunner?: QueryRunner;

    constructor() {
        this.isTransaction = false;
        this.queryRunner = undefined;
    }

    async repository<T>(targetEntity: EntityTarget<T>): Promise<Repository<T>> {
        if (!this.isTransaction) {
            const entityManager: EntityManager = getManager();
            return entityManager.getRepository(targetEntity);
        }
        if (!this.queryRunner) {
            this.queryRunner = getConnection().createQueryRunner();
            await this.queryRunner.connect();
            await this.queryRunner.startTransaction();
        }
        return this.queryRunner.manager.getRepository(targetEntity);
    }

    private reset() {
        this.queryRunner = undefined;
        this.isTransaction = false;
    }

    async use() {
        if (!this.queryRunner && !this.isTransaction) {
            this.isTransaction = true;
            return;
        }

        throw new Error('🔧 Inconsistent request transaction.');
    }

    async rollback() {
        if (!this.queryRunner || !this.isTransaction) {
            throw new Error('🔧 Transaction is not started.');
        }
        await this.queryRunner.rollbackTransaction();
        await this.queryRunner.release();
        this.reset();
    }

    async commit() {
        if (!this.queryRunner || !this.isTransaction) {
            throw new Error('🔧 Transaction is not started.');
        }
        await this.queryRunner.commitTransaction();
        await this.queryRunner.release();
        this.reset();
    }

    async forSafety() {
        if (!this.queryRunner && !this.isTransaction) {
            return;
        }

        if (this.isTransaction && this.queryRunner) {
            await this.rollback();
            return;
        }

        throw new Error('🔧 Inconsistent request transaction.');
    }
}
