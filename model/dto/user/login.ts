import { IsAscii, IsEmail, MaxLength, MinLength } from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { ILoginDTO } from '.';

export class LoginDTO implements ILoginDTO {
    @MinLength(4, { message: 'Email is too short. Minimum 4 characters.' })
    @MaxLength(128, { message: 'Email is too long. Maximum 128 characters.' })
    @IsEmail(undefined, { message: 'Email is not valid.' })
    email = '';

    @MinLength(8, { message: 'Password is too short. Minimum 8 characters.' })
    @MaxLength(64, { message: 'Password is too long. Maximum 64 characters.' })
    @IsAscii({ message: 'Password contains unallowed characters. Only ascii allowed.' })
    password = '';

    constructor(item: ILoginDTO) {
        ParseAndOmit(item, this);
    }
}
