import { EntityTarget, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';
import { PaginationResult } from '../model/dto/abstract';

export abstract class BaseRepository<T> {
    protected getRepository(req: Request, item: EntityTarget<T>): Promise<Repository<T>> {
        return req.transaction.repository(item);
    }

    protected async getAll(
        repo: Repository<T>,
        page: number,
        itemPerPage: number,
        options?: FindOneOptions<T>
    ): Promise<PaginationResult<T>> {
        if (page <= 0) {
            page = 1;
        }
        if (itemPerPage < 5) {
            itemPerPage = 5;
        }

        if (itemPerPage > 25) {
            itemPerPage = 25;
        }

        const totalItems: number = await repo.count({});
        const maxPage = Math.ceil(totalItems / itemPerPage);

        let items: T[] = [];
        if (totalItems > 0) {
            const take = itemPerPage;
            const skip = (page - 1) * take;
            if (!options) {
                items = await repo.find({
                    skip,
                    take,
                });
            } else {
                const filter: FindManyOptions<T> = { skip, take, ...options };
                items = await repo.find(filter);
            }
        }

        return {
            page,
            maxPage,
            itemPerPage,
            totalItems,
            items,
        };
    }
}
