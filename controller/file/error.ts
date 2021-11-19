import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const FileControllerError = {
    FILE_NOT_FOUND: new StandardError('No file found.', StatusCodes.UNPROCESSABLE_ENTITY),
    FILE_EXTENSION_NOT_SUPPORTED: new StandardError(
        'Only image mimetype supported.',
        StatusCodes.UNPROCESSABLE_ENTITY
    ),
};
