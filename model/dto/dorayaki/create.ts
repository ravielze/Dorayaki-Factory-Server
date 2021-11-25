import {
    ArrayMinSize,
    IsAscii,
    IsInt,
    IsUrl,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { ICreateDorayakiDTO, ICreateRecipeDTO } from '.';
import { DorayakiDAO } from '../../dao/dorayaki';

export class CreateRecipeDTO implements ICreateRecipeDTO {
    @Min(1, { message: 'ID minimum value is 1.' })
    @Max(2 ** 32, { message: 'ID reached maximum amount.' })
    @IsInt({ message: 'ID can not be floating point' })
    id = 0;

    @Min(1, { message: 'Amount minimum value is 1.' })
    @Max(2 ** 16, { message: 'Amount reached maximum amount.' })
    @IsInt({ message: 'Amount can not be floating point' })
    amount = 0;

    constructor(item: ICreateRecipeDTO) {
        ParseAndOmit(item, this);
    }
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

    @ArrayMinSize(1, { message: 'Dorayaki must have at least one ingredient for the recipe.' })
    recipes: CreateRecipeDTO[] = [];

    constructor(item: ICreateDorayakiDTO) {
        ParseAndOmit(item, this);
        this.recipes = this.recipes.map((i) => new CreateRecipeDTO(i));
    }

    ToDAO(): DorayakiDAO {
        return new DorayakiDAO(this.name, this.description, this.picture);
    }

    RemoveDuplicateIngredientsID(): CreateDorayakiDTO {
        const result: CreateRecipeDTO[] = [];
        this.recipes.forEach((i) => {
            if (result.filter((j) => i.id == j.id).length != 0) {
                return;
            }
            result.push(i);
        });
        this.recipes = result;
        return this;
    }
}
