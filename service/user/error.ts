import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const UserServiceError = {
    EMAIL_IS_ALREADY_REGISTERED: new StandardError(
        'Email is already registered. Please use another.',
        StatusCodes.BAD_REQUEST
    ),
    LOGIN_FAILED: new StandardError('Email/Password is wrong.', StatusCodes.BAD_REQUEST),
    NOT_LOGGED_IN: new StandardError('You are not logged in.', StatusCodes.FORBIDDEN),
    INCONSISTENT_DATA_CAUSE_KEY: new Error('Inconsistent data found. Key id not found.'),
    INCONSISTENT_DATA_CAUSE_USER: new Error('Inconsistent data found. User not found.'),
};
