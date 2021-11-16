import { IsAscii, IsEmail, MaxLength, MinLength } from 'class-validator';

interface IRegisterDTO {
    email: string;
    password: string;
}

class RegisterDTO implements IRegisterDTO {
    @MinLength(4, { message: 'Email is too short. Minimum 4 characters.' })
    @MaxLength(128, { message: 'Email is too long. Maximum 128 characters.' })
    @IsEmail(undefined, { message: 'Email is not valid.' })
    email!: string;

    @MinLength(8, { message: 'Password is too short. Minimum 4 characters.' })
    @MaxLength(64, { message: 'Password is too long. Maximum 64 characters.' })
    @IsAscii({ message: 'Password contains unallowed characters. Only ascii allowed.' })
    password!: string;

    constructor(item: IRegisterDTO) {
        Object.assign(this, item);
    }
}

export { IRegisterDTO, RegisterDTO };
