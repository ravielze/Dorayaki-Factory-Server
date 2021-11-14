import { Service } from 'typedi';
import UserRepository from '../repository/user';

@Service()
class UserService {
    constructor(public readonly repo: UserRepository) {}
}

export default UserService;
