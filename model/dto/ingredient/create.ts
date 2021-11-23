import { IsAscii, IsUrl, MaxLength, MinLength } from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { ICreateIngredientDTO } from '.';
import { IngredientDAO } from '../../dao/ingredient';

export class CreateIngredientDTO implements ICreateIngredientDTO {
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

    stock = 0;

    constructor(item: ICreateIngredientDTO) {
        ParseAndOmit(item, this);
    }

    ToDAO(): IngredientDAO {
        return new IngredientDAO(this.name, this.description, this.picture, this.stock);
    }
}
