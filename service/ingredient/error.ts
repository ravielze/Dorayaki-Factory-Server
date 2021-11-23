import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const IngredientServiceError = {
    INGREDIENT_ID_NOT_FOUND: new StandardError(
        'Ingredient with specified ID is not found.',
        StatusCodes.BAD_REQUEST
    ),
    PAGE_NOT_FOUND: new StandardError('Page not found.', StatusCodes.BAD_REQUEST),
};
