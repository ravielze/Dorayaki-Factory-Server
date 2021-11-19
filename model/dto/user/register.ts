import { IsAscii, IsEmail, MaxLength, MinLength } from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { UserDAO } from '../../dao/user';
import { IRegisterDTO } from '.';

export class RegisterDTO implements IRegisterDTO {
    @MinLength(4, { message: 'Email is too short. Minimum 4 characters.' })
    @MaxLength(128, { message: 'Email is too long. Maximum 128 characters.' })
    @IsEmail(undefined, { message: 'Email is not valid.' })
    email = '';

    @MinLength(8, { message: 'Password is too short. Minimum 8 characters.' })
    @MaxLength(64, { message: 'Password is too long. Maximum 64 characters.' })
    @IsAscii({ message: 'Password contains unallowed characters. Only ascii allowed.' })
    password = '';

    constructor(item: IRegisterDTO) {
        ParseAndOmit(item, this);
    }

    ToDAO(): UserDAO {
        return new UserDAO(this.email, this.password);
    }
}
