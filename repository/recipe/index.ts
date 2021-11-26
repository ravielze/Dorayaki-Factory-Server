import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { RecipeDAO } from '../../model/dao/recipe';

@Service()
class RecipeRepository extends BaseRepository<RecipeDAO> {
  constructor() {
    super()
  }

  async saveRecipes(req: Request, items: RecipeDAO[]) {
    const repo: Repository<RecipeDAO> = await this.getRepository(req, RecipeDAO)

    await repo.save(items)
  }
}
export default RecipeRepository;
