import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const UserControllerError = {
    BEARER_TOKEN_NOT_FOUND: new StandardError('Bearer token not found.', StatusCodes.UNAUTHORIZED),
    BEARER_TOKEN_NOT_VALID: new StandardError('Bearer token not valid.', StatusCodes.UNAUTHORIZED),
};
