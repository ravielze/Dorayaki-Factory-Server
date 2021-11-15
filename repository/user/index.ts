import { Service } from 'typedi';
import { BaseRepository } from '..';
import DatabaseConnection from '../../database';
import { UserDAO } from '../../model/dao/user';

@Service()
class UserRepository extends BaseRepository<UserDAO> {
    constructor(private readonly db: DatabaseConnection) {
        super(db.getRepository(UserDAO));
    }

    async getUsername(username: string): Promise<UserDAO | undefined> {
        return this.repo.findOne({
            where: {
                username,
            },
        });
    }

    async isUsernameExists(username: string): Promise<boolean> {
        const count: number = await this.repo.count({
            where: {
                username,
            },
        });
        return count != 0;
    }

    async createUser(item: UserDAO): Promise<UserDAO> {
        return this.repo.save(item);
    }
}
export default UserRepository;
