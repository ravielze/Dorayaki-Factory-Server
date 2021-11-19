import { UserDAO } from '../../model/dao/user';

declare global {
    namespace Express {
        interface Request {
            userLoggedIn?: UserDAO;
        }
    }
}
