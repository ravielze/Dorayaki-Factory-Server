import { Request } from 'express';
import { Service } from 'typedi';
import { IngredientDAO } from '../../model/dao/ingredient';
import { ArrayIngredients } from '../../model/dto/ingredient';
import { CreateIngredientDTO } from '../../model/dto/ingredient/create';
import { UpdateIngredientDTO } from '../../model/dto/ingredient/update';
import IngredientRepository from '../../repository/ingredient';
import { IngredientServiceError } from './error';

@Service()
class IngredientService {
    constructor(private readonly repo: IngredientRepository) {}

    async createIngredient(req: Request, item: CreateIngredientDTO): Promise<IngredientDAO> {
        return this.repo.createIngredient(req, item.ToDAO());
    }

    async updateIngredient(req: Request, item: UpdateIngredientDTO): Promise<void> {
        const ingredient: IngredientDAO | undefined = await this.repo.getIngredient(req, item.id);
        if (!ingredient) {
            throw IngredientServiceError.INGREDIENT_ID_NOT_FOUND;
        }

        await this.repo.updateIngredients(req, ingredient.id, item.ToDAO());
    }

    async getIngredients(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<ArrayIngredients> {
        const result = await this.repo.getAllIngredients(req, page, itemPerPage);

        if (page > result.maxPage) {
            throw IngredientServiceError.PAGE_NOT_FOUND;
        }

        return result;
    }
}

export default IngredientService;
