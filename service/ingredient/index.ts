import { Request } from 'express';
import { Service } from 'typedi';
import { IngredientDAO } from '../../model/dao/ingredient';
import { PaginationResult } from '../../model/dto/abstract';
import { MinifiedIngredientsDTO } from '../../model/dto/ingredient';
import { CreateIngredientDTO } from '../../model/dto/ingredient/create';
import { UpdateIngredientDTO } from '../../model/dto/ingredient/update';
import IngredientRepository from '../../repository/ingredient';
import { IngredientServiceError } from './error';

@Service()
class IngredientService {
    constructor(private readonly repo: IngredientRepository) {}

    async createIngredient(req: Request, item: CreateIngredientDTO): Promise<IngredientDAO> {
        return this.repo.saveIngredient(req, item.ToDAO());
    }

    async updateIngredient(req: Request, item: UpdateIngredientDTO): Promise<void> {
        const ingredient: IngredientDAO | undefined = await this.repo.getIngredient(req, item.id);
        if (!ingredient) {
            throw IngredientServiceError.INGREDIENT_ID_NOT_FOUND;
        }

        await this.repo.saveIngredient(req, item.ToDAOWithID(item.id));
    }

    async areIngredientIDsExist(req: Request, ids: number[]): Promise<[boolean, number[]]> {
        const result: number[] = [];
        const ingredients: MinifiedIngredientsDTO[] = await this.repo.getAllIngredientsMinified(
            req
        );

        ids.forEach((each) => {
            if (ingredients.findIndex((i) => i.id == each) === -1) {
                result.push(each);
            }
        });

        return [result.length == 0, result];
    }

    async getIngredients(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<PaginationResult<IngredientDAO>> {
        const result = await this.repo.getAllIngredients(req, page, itemPerPage);

        if (page != 1 && page > result.maxPage) {
            throw IngredientServiceError.PAGE_NOT_FOUND;
        }

        if (result.maxPage < 1) {
            result.maxPage = 1;
        }

        return result;
    }

    async getIngredientsMinified(req: Request): Promise<MinifiedIngredientsDTO[]> {
        return this.repo.getAllIngredientsMinified(req);
    }
}

export default IngredientService;
