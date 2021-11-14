import { Repository } from 'typeorm';

export abstract class BaseRepository<T> {
    constructor(protected readonly repo: Repository<T>) {}
}
