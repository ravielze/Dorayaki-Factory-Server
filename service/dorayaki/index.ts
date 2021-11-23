import { Request } from 'express';
import { Service } from 'typedi';
import DorayakiRepository from '../../repository/dorayaki';
import RecipeRepository from '../../repository/recipe';

@Service()
class DorayakiService {
    constructor(
        private readonly repo: DorayakiRepository,
        private readonly recipeRepo: RecipeRepository
    ) {}

    async createRecipe(req: Request) {}
}

export default DorayakiService;
