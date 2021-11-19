import { Service } from 'typedi';
import { BaseRepository } from '..';
import DatabaseConnection from '../../database';
import { UserDAO } from '../../model/dao/user';

@Service()
class UserRepository extends BaseRepository<UserDAO> {
    constructor(private readonly db: DatabaseConnection) {
        super(db.getRepository(UserDAO));
    }

    async getByEmail(email: string): Promise<UserDAO | undefined> {
        return this.repo.findOne({
            where: {
                email,
            },
        });
    }

    async getByID(id: number): Promise<UserDAO | undefined> {
        return this.repo.findOne({
            where: {
                id,
            },
        });
    }

    async isEmailExists(email: string): Promise<boolean> {
        const count: number = await this.repo.count({
            where: {
                email,
            },
        });
        return count != 0;
    }

    async createUser(item: UserDAO): Promise<UserDAO> {
        return this.repo.save(item);
    }
}
export default UserRepository;
