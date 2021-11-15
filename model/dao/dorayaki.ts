import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '.';
import { RecipeDAO } from './recipe';

@Entity({ name: 'dorayaki' })
export class DorayakiDAO extends BaseModel {
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

    @OneToMany(() => RecipeDAO, (recipe) => recipe.dorayaki)
    recipes!: Promise<RecipeDAO[]>;
}
