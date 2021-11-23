import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '.';
import { RecipeDAO } from './recipe';

@Entity({ name: 'dorayaki' })
export class DorayakiDAO extends BaseModel {
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

    @OneToMany(() => RecipeDAO, (recipe) => recipe.dorayaki)
    recipes!: Promise<RecipeDAO[]>;

    constructor(name: string, description: string, picture: string) {
        super();
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.recipes = Promise.resolve<RecipeDAO[]>([]);
    }
}
