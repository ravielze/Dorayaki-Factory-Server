import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '.';
import { RecipeDAO } from './recipe';

@Entity({ name: 'ingredient' })
export class IngredientDAO extends BaseModel {
    @Column({
        type: 'varchar',
        length: 512,
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 2048,
    })
    description!: string;

    @Column({
        type: 'varchar',
        length: 1024,
    })
    picture!: string;

    @Column({
        type: 'integer',
        width: 32,
    })
    stock!: number;

    @OneToMany(() => RecipeDAO, (recipe) => recipe.ingredient)
    recipes!: Promise<RecipeDAO[]>;
}
