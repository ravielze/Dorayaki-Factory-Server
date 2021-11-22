import { Service } from 'typedi';
import { UserDAO } from '../../model/dao/user';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';

@Service()
class UserRepository extends BaseRepository<UserDAO> {
    constructor() {
        super();
    }

    async getByEmail(req: Request, email: string): Promise<UserDAO | undefined> {
        const repo: Repository<UserDAO> = await this.getRepository(req, UserDAO);

        return repo.findOne({
            where: {
                email,
            },
        });
    }

    async getByID(req: Request, id: number): Promise<UserDAO | undefined> {
        const repo: Repository<UserDAO> = await this.getRepository(req, UserDAO);
        return repo.findOne({
            where: {
                id,
            },
        });
    }

    async isEmailExists(req: Request, email: string): Promise<boolean> {
        const repo: Repository<UserDAO> = await this.getRepository(req, UserDAO);
        const count: number = await repo.count({
            where: {
                email,
            },
        });
        return count != 0;
    }

    async createUser(req: Request, item: UserDAO): Promise<UserDAO> {
        const repo: Repository<UserDAO> = await this.getRepository(req, UserDAO);
        return repo.save(item);
    }
}
export default UserRepository;
