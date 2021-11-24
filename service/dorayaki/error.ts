import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const DorayakiServiceError = {
    RECIPE_INVALID_INGREDIENT: new StandardError(
        'Recipe contain invalid ingredient(s) id.',
        StatusCodes.BAD_REQUEST
    ),
};
