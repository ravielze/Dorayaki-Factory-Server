import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';
import { IngredientDAO } from '../../model/dao/ingredient';

export const IngredientServiceError = {
    INGREDIENT_ID_NOT_FOUND: new StandardError(
        'Ingredient with specified ID is not found.',
        StatusCodes.BAD_REQUEST
    ),
    PAGE_NOT_FOUND: new StandardError('Page not found.', StatusCodes.BAD_REQUEST),
    INGREDIENT_OUT_OF_STOCK: (item: IngredientDAO, needed: number): StandardError => {
        return new StandardError(
            `Ingredient ${item.name} (ID: ${item.id}) is out of stock. Needed: ${needed}`,
            StatusCodes.BAD_REQUEST
        );
    },
};
