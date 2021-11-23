import { IsAscii, IsInt, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { BaseDTOConstructor as ParseAndOmit } from '..';
import { IUpdateIngredientDTO } from '.';
import { IngredientDAO } from '../../dao/ingredient';

export class UpdateIngredientDTO implements IUpdateIngredientDTO {
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

    @Min(1, { message: 'ID not valid. Minimum value is 1.' })
    @Max(2 ** 32, { message: 'ID reached maximum amount.' })
    @IsInt({ message: 'ID can not be floating point' })
    id = 0;

    @Min(0, { message: 'Stock minimum value is 0.' })
    @Max(2 ** 32, { message: 'Stock reached maximum amount.' })
    @IsInt({ message: 'Stock can not be floating point' })
    stock = 0;

    constructor(item: IUpdateIngredientDTO) {
        ParseAndOmit(item, this);
    }

    ToDAOWithID(id: number): IngredientDAO {
        const result = new IngredientDAO(this.name, this.description, this.picture, this.stock);
        result.id = id;
        return result;
    }

    ToDAO(): IngredientDAO {
        return new IngredientDAO(this.name, this.description, this.picture, this.stock);
    }
}
