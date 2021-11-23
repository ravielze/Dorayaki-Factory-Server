import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { RecipeDAO } from '../../model/dao/recipe';
import { DorayakiDAO } from '../../model/dao/dorayaki';

@Service()
class RecipeRepository extends BaseRepository<RecipeDAO> {
    constructor() {
        super();
    }

    async saveRecipe(req: Request, item: RecipeDAO): Promise<RecipeDAO> {
        const repo: Repository<RecipeDAO> = await this.getRepository(req, RecipeDAO);

        return repo.save(item);
    }
}
export default RecipeRepository;
