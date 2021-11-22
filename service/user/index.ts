import { Service } from 'typedi';
import { UserDAO } from '../../model/dao/user';
import UserRepository from '../../repository/user';
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { RegisterDTO } from '../../model/dto/user/register';
import { LoginDTO } from '../../model/dto/user/login';
import Config from '../../app/config';
import { TokenDTO, UserDTO } from '../../model/dto/user';
import { UserServiceError } from './error';
import { JWT_ALGORITHM, SALT_ROUND } from './config';
import { Request } from 'express';

@Service()
class UserService {
    constructor(private readonly repo: UserRepository, private readonly config: Config) {}

    validateToken(jwtToken: string): JwtPayload {
        try {
            const payload: JwtPayload = jwt.verify(jwtToken, this.config.jwtSecret, {
                algorithms: [JWT_ALGORITHM],
            }) as JwtPayload;
            return payload;
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                throw UserServiceError.NOT_LOGGED_IN;
            }
            throw error;
        }
    }

    async whoAmI(req: Request, jwtToken: string): Promise<UserDAO> {
        const payload: JwtPayload = this.validateToken(jwtToken);
        const idPayload: number = payload.id;
        if (!idPayload) {
            throw UserServiceError.INCONSISTENT_DATA_CAUSE_KEY;
        }

        const user: UserDAO | undefined = await this.repo.getByID(req, idPayload);
        if (!user) {
            throw UserServiceError.INCONSISTENT_DATA_CAUSE_USER;
        }
        return user;
    }

    async register(req: Request, item: RegisterDTO): Promise<UserDAO> {
        const isEmailExists: boolean = await this.repo.isEmailExists(req, item.email);
        if (isEmailExists) {
            throw UserServiceError.EMAIL_IS_ALREADY_REGISTERED;
        }

        const hashedPassword: string = await bcrypt.hash(item.password, SALT_ROUND);

        const processedItem: UserDAO = item.ToDAO();
        processedItem.password = hashedPassword;

        const result = await this.repo.createUser(req, processedItem);
        return result;
    }

    async login(req: Request, item: LoginDTO): Promise<TokenDTO> {
        const user: UserDAO | undefined = await this.repo.getByEmail(req, item.email);
        if (!user) {
            throw UserServiceError.LOGIN_FAILED;
        }

        const isPasswordOk: boolean = await bcrypt.compare(item.password, user.password);
        if (!isPasswordOk) {
            throw UserServiceError.LOGIN_FAILED;
        }

        const signedObject: UserDTO = { id: user.id, email: user.email };
        const token = jwt.sign(signedObject, this.config.jwtSecret, {
            algorithm: JWT_ALGORITHM,
            expiresIn: this.config.jwtExpiresIn,
        });

        const result: TokenDTO = { token, user };
        return result;
    }
}

export default UserService;
