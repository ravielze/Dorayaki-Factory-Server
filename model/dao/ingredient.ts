import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '.';
import { RecipeDAO } from './recipe';

@Entity({ name: 'ingredient' })
export class IngredientDAO extends BaseModel {
    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 2048,
        nullable: false,
    })
    description!: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: false,
    })
    picture!: string;

    @Column({
        type: 'integer',
        width: 32,
        nullable: false,
    })
    stock!: number;

    @OneToMany(() => RecipeDAO, (recipe) => recipe.ingredient)
    recipes!: Promise<RecipeDAO[]>;

    constructor(name: string, description: string, picture: string, stock: number) {
        super();
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.stock = stock;
    }

    static FromID(id: number): IngredientDAO {
        const result = new IngredientDAO('', '', '', 0);
        result.id = id;
        return result;
    }
}
