import { StatusCodes } from '../../common/http';
import { AccessManager } from '../../database/access';
import { UserDAO } from '../../model/dao/user';

declare global {
    namespace Express {
        interface Request {
            userLoggedIn?: UserDAO;
            transaction: AccessManager;
        }

        interface Response {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return: (responseBody: any) => Response;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            returnError: (code: StatusCodes, responseBody: any) => Response;
        }
    }
}
