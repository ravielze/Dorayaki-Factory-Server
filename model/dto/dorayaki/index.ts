import { DorayakiDAO } from '../../dao/dorayaki';
import { RecipeDAO } from '../../dao/recipe';

interface ICreateDorayakiDTO {
    name: string;
    description: string;
    picture: string;
    recipes: ICreateRecipeDTO[];
}

interface ICreateRecipeDTO {
    id: number;
    amount: number;
}

interface RecipeDTO {
    name: string;
    description: string;
    picture: string;
    amount: number;
}

interface DorayakiDTO {
    name: string;
    description: string;
    picture: string;
    recipes: RecipeDTO[];
}

function ConvertRecipe(item: RecipeDAO): RecipeDTO {
    return {
        name: item.ingredient.name,
        description: item.ingredient.description,
        picture: item.ingredient.picture,
        amount: item.amount,
    };
}

function ConvertDorayaki(item: DorayakiDAO): DorayakiDTO {
    return {
        name: item.name,
        description: item.description,
        picture: item.picture,
        recipes: item.recipes.map((i) => ConvertRecipe(i)),
    };
}

export {
    RecipeDTO,
    ICreateDorayakiDTO,
    DorayakiDTO,
    ICreateRecipeDTO,
    ConvertRecipe,
    ConvertDorayaki,
};
