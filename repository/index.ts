import { EntityTarget, Repository } from 'typeorm';
import { Request } from 'express';

export abstract class BaseRepository<T> {
    protected getRepository(req: Request, item: EntityTarget<T>): Promise<Repository<T>> {
        return req.transaction.repository(item);
    }
}
