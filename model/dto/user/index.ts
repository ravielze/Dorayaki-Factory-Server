import { UserDAO } from '../../dao/user';

interface IRegisterDTO {
    email: string;
    password: string;
}

interface ILoginDTO {
    email: string;
    password: string;
}

interface TokenDTO {
    token: string;
    user: UserDAO;
}

interface UserDTO {
    id: number;
    email: string;
}

function ConvertUser(item: UserDAO): UserDTO {
    return { id: item.id, email: item.email };
}

export { IRegisterDTO, ILoginDTO, TokenDTO, UserDTO, ConvertUser };
