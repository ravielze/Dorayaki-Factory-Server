import { Service } from 'typedi';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from '..';
import DatabaseConnection from '../../database';
import { IngredientDAO } from '../../model/dao/ingredient';

export interface ArrayIngredients {
    items: IngredientDAO[];
    page: number;
    maxPage: number;
    itemPerPage: number;
    totalItems: number;
}

@Service()
class IngredientRepository extends BaseRepository<IngredientDAO> {
    constructor(private readonly db: DatabaseConnection) {
        super(db.getRepository(IngredientDAO));
    }

    async createIngredient(item: IngredientDAO): Promise<IngredientDAO> {
        return this.repo.save(item);
    }

    async updateIngredients(id: number, item: QueryDeepPartialEntity<IngredientDAO>) {
        await this.repo.update({ id }, item);
    }

    async getIngredient(id: number): Promise<IngredientDAO | undefined> {
        return this.repo.findOne(id);
    }

    async getAllIngredients(page: number, itemPerPage: number): Promise<ArrayIngredients> {
        if (page <= 0) {
            page = 1;
        }
        if (itemPerPage < 5) {
            itemPerPage = 5;
        }

        if (itemPerPage > 25) {
            itemPerPage = 25;
        }

        const totalItems: number = await this.repo.count({});
        const maxPage = Math.ceil(totalItems / itemPerPage);

        let items: IngredientDAO[] = [];
        if (totalItems > 0) {
            const take = itemPerPage;
            const skip = (page - 1) * take;
            const result = await this.repo.find({
                skip,
                take,
                order: { name: 'ASC' },
            });
            items = result;
        }

        return {
            page,
            maxPage,
            itemPerPage,
            totalItems,
            items,
        };
    }
}
export default IngredientRepository;
