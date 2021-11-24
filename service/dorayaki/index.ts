import { Request } from 'express';
import { Service } from 'typedi';
import { DorayakiDAO } from '../../model/dao/dorayaki';
import { RecipeDAO } from '../../model/dao/recipe';
import { CreateDorayakiDTO } from '../../model/dto/dorayaki/create';
import DorayakiRepository from '../../repository/dorayaki';
import RecipeRepository from '../../repository/recipe';
import IngredientService from '../ingredient';
import { DorayakiServiceError } from './error';

@Service()
class DorayakiService {
    constructor(
        private readonly repo: DorayakiRepository,
        private readonly recipeRepo: RecipeRepository,
        private readonly ingrService: IngredientService
    ) {}

    async createDorayakiRecipe(req: Request, item: CreateDorayakiDTO): Promise<RecipeDAO[]> {
        if (!req.transaction.isTransaction) {
            throw new Error('Unsafe service calls. Expected using transaction.');
        }

        const ingredientIds: number[] = item.recipes.map((i) => i.id);
        const [isOk] = await this.ingrService.areIngredientIDsExist(req, ingredientIds);
        if (!isOk) {
            throw DorayakiServiceError.RECIPE_INVALID_INGREDIENT;
        }

        const dorayaki: DorayakiDAO = await this.repo.saveDorayaki(req, item.ToDAO());
        const recipes: RecipeDAO[] = item.recipes.map(
            (r) => new RecipeDAO(dorayaki, r.id, r.amount)
        );

        const result: RecipeDAO[] = await this.recipeRepo.saveRecipes(req, recipes);
        return result;
    }
}

export default DorayakiService;
