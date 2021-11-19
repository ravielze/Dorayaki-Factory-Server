import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const UserControllerError = {
    BEARER_TOKEN_NOT_FOUND: new StandardError(
        'Bearer token is not found.',
        StatusCodes.UNAUTHORIZED
    ),
    BEARER_TOKEN_NOT_VALID: new StandardError(
        'Bearer token is not valid.',
        StatusCodes.UNAUTHORIZED
    ),
    API_KEY_NOT_FOUND: new StandardError('API Key is not found.', StatusCodes.UNAUTHORIZED),
    API_KEY_NOT_VALID: new StandardError('API Key is not valid.', StatusCodes.UNAUTHORIZED),
    BOTH_NOT_FOUND_OR_VALID: new StandardError(
        'API Key or Bearer token is not found or valid.',
        StatusCodes.UNAUTHORIZED
    ),
};
