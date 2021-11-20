import { Service } from 'typedi';
import IngredientRepository from '../../repository/ingredient';

@Service()
class IngredientService {
    constructor(private readonly repo: IngredientRepository) {}
}

export default IngredientService;
