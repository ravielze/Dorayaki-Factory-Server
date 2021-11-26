import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const DorayakiServiceError = {
    RECIPE_INVALID_INGREDIENT: new StandardError(
        'Recipe contain invalid ingredient(s) id.',
        StatusCodes.BAD_REQUEST
    ),
    PAGE_NOT_FOUND: new StandardError('Page not found.', StatusCodes.BAD_REQUEST),
    DORAYAKI_ID_NOT_FOUND: new StandardError('Dorayaki ID not found.', StatusCodes.BAD_REQUEST),
};
