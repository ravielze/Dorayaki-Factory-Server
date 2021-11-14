import { BaseRepository } from '..';
import DatabaseConnection from '../../database';
import { User } from '../../model/dao/user';

class UserRepository extends BaseRepository<User> {
    constructor(private readonly db: DatabaseConnection) {
        super(db.getRepository(User));
    }

    async getUsername(username: string): Promise<User | undefined> {
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

    async createUser(item: User): Promise<User> {
        return this.repo.save(item);
    }
}
export default UserRepository;
