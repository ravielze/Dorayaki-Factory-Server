import { IngredientDAO } from '../../dao/ingredient';

interface ICreateIngredientDTO {
    name: string;
    description: string;
    picture: string;
}

interface IUpdateIngredientDTO extends ICreateIngredientDTO {
    stock: number;
    id: number;
}

interface IngredientDTO {
    name: string;
    description: string;
    picture: string;
    stock: number;
}

function ConvertIngredient(item: IngredientDAO): IngredientDTO {
    return {
        name: item.name,
        description: item.description,
        picture: item.picture,
        stock: item.stock,
    };
}

interface BaseArrayIngredients {
    page: number;
    maxPage: number;
    itemPerPage: number;
    totalItems: number;
}

interface ArrayIngredients extends BaseArrayIngredients {
    items: IngredientDAO[];
}

interface ArrayIngredientsDTO extends BaseArrayIngredients {
    items: IngredientDTO[];
}

interface MinifiedIngredientsDTO {
    id: number;
    name: string;
}

function ConvertMinifiedIngredient(item: IngredientDAO): MinifiedIngredientsDTO {
    return { name: item.name, id: item.id };
}

export {
    ICreateIngredientDTO,
    IUpdateIngredientDTO,
    ConvertIngredient,
    ArrayIngredients,
    ArrayIngredientsDTO,
    ConvertMinifiedIngredient,
    MinifiedIngredientsDTO,
    IngredientDTO,
};
