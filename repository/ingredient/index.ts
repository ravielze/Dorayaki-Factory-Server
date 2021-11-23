import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from '..';
import { Request } from 'express';
import { IngredientDAO } from '../../model/dao/ingredient';
import { ArrayIngredients } from '../../model/dto/ingredient';

@Service()
class IngredientRepository extends BaseRepository<IngredientDAO> {
    constructor() {
        super();
    }

    async saveIngredient(req: Request, item: IngredientDAO): Promise<IngredientDAO> {
        const repo: Repository<IngredientDAO> = await this.getRepository(req, IngredientDAO);

        return repo.save(item);
    }

    async getIngredient(req: Request, id: number): Promise<IngredientDAO | undefined> {
        const repo: Repository<IngredientDAO> = await this.getRepository(req, IngredientDAO);

        return repo.findOne(id);
    }

    async getAllIngredients(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<ArrayIngredients> {
        const repo: Repository<IngredientDAO> = await this.getRepository(req, IngredientDAO);

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

        let items: IngredientDAO[] = [];
        if (totalItems > 0) {
            const take = itemPerPage;
            const skip = (page - 1) * take;
            const result = await repo.find({
                skip,
                take,
                order: { name: 'ASC' },
            });
            items = result;
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
export default IngredientRepository;
