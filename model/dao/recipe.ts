import { Column, Entity, ManyToOne } from 'typeorm';
import { SimpleBaseModel } from '.';
import { DorayakiDAO } from './dorayaki';
import { IngredientDAO } from './ingredient';
import 'reflect-metadata';

@Entity({ name: 'recipe' })
export class RecipeDAO extends SimpleBaseModel {
    @ManyToOne(() => DorayakiDAO, (dorayaki) => dorayaki.recipes, {
        cascade: ['insert'],
        primary: true,
        nullable: false,
    })
    dorayaki!: DorayakiDAO;

    @ManyToOne(() => IngredientDAO, (ingredient) => ingredient.recipes, {
        primary: true,
        nullable: false,
    })
    ingredient!: IngredientDAO;

    @Column({
        type: 'integer',
        width: 16,
        nullable: false,
    })
    amount!: number;
}
