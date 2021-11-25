import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { DorayakiDAO } from '../../model/dao/dorayaki';
import { PaginationResult } from '../../model/dto/abstract';

@Service()
class DorayakiRepository extends BaseRepository<DorayakiDAO> {
    constructor() {
        super();
    }

    async saveDorayaki(req: Request, item: DorayakiDAO): Promise<DorayakiDAO> {
        const repo: Repository<DorayakiDAO> = await this.getRepository(req, DorayakiDAO);

        return repo.save(item);
    }

    async getDorayaki(req: Request, id: number): Promise<DorayakiDAO | undefined> {
        const repo: Repository<DorayakiDAO> = await this.getRepository(req, DorayakiDAO);

        return repo.findOne(id, { relations: ['recipes'] });
    }

    async getDorayakis(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<PaginationResult<DorayakiDAO>> {
        const repo: Repository<DorayakiDAO> = await this.getRepository(req, DorayakiDAO);

        return this.getAll(repo, page, itemPerPage, {
            order: { name: 'ASC' },
            relations: ['recipes'],
        });
    }
}
export default DorayakiRepository;
