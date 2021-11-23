import {
    ArrayMinSize,
    IsArray,
    isArray,
    IsAscii,
    IsInt,
    IsUrl,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { ICreateDorayakiDTO, ICreateRecipeDTO } from '.';
import { DorayakiDAO } from '../../dao/dorayaki';

export class CreateRecipeDTO implements ICreateRecipeDTO {
    @Min(0, { message: 'ID minimum value is 0.' })
    @Max(2 ** 32, { message: 'ID reached maximum amount.' })
    @IsInt({ message: 'ID can not be floating point' })
    id = 0;

    @Min(0, { message: 'Amount minimum value is 0.' })
    @Max(2 ** 16, { message: 'Amount reached maximum amount.' })
    @IsInt({ message: 'Amount can not be floating point' })
    amount = 0;
}

export class CreateDorayakiDTO implements ICreateDorayakiDTO {
    @MinLength(1, { message: 'Name is too short. Minimum 1 characters.' })
    @MaxLength(512, { message: 'Name is too long. Maximum 512 characters.' })
    @IsAscii({ message: 'Name contains unallowed characters. Only ascii allowed.' })
    name = '';

    @MinLength(1, { message: 'Description is too short. Minimum 1 characters.' })
    @MaxLength(2048, { message: 'Description is too long. Maximum 2048 characters.' })
    @IsAscii({ message: 'Description contains unallowed characters. Only ascii allowed.' })
    description = '';

    @MinLength(1, { message: 'Picture URL is too short. Minimum 1 characters.' })
    @MaxLength(512, { message: 'Picture URL is too long. Maximum 1024 characters.' })
    @IsUrl(undefined, { message: 'Picture URL is not in URL format.' })
    picture = '';

    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: 'Dorayaki must have at least one ingredient for the recipe.' })
    recipes: CreateRecipeDTO[] = [];

    constructor(item: ICreateDorayakiDTO) {
        ParseAndOmit(item, this);
    }

    ToDAO(): DorayakiDAO {
        return new DorayakiDAO(this.name, this.description, this.picture);
    }
}
