import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { IngredientDAO } from '../../model/dao/ingredient';
import { ConvertMinifiedIngredient, MinifiedIngredientsDTO } from '../../model/dto/ingredient';
import { PaginationResult } from '../../model/dto/abstract';

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

    async getAllIngredientsMinified(req: Request): Promise<MinifiedIngredientsDTO[]> {
        const repo: Repository<IngredientDAO> = await this.getRepository(req, IngredientDAO);
        const result = await repo.find({ order: { name: 'ASC' }, select: ['id', 'name'] });
        return result.map((i) => ConvertMinifiedIngredient(i));
    }

    async getAllIngredients(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<PaginationResult<IngredientDAO>> {
        const repo: Repository<IngredientDAO> = await this.getRepository(req, IngredientDAO);

        return this.getAll(repo, page, itemPerPage, { order: { name: 'ASC' } });
    }
}
export default IngredientRepository;
