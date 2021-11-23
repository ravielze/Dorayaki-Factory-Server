import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { DorayakiDAO } from '../../model/dao/dorayaki';

@Service()
class DorayakiRepository extends BaseRepository<DorayakiDAO> {
    constructor() {
        super();
    }

    async saveDorayaki(req: Request, item: DorayakiDAO): Promise<DorayakiDAO> {
        const repo: Repository<DorayakiDAO> = await this.getRepository(req, DorayakiDAO);

        return repo.save(item);
    }

    async getDorayakis(req: Request): Promise<DorayakiDAO[]> {
        const repo: Repository<DorayakiDAO> = await this.getRepository(req, DorayakiDAO);
        return repo.find();
    }
}
export default DorayakiRepository;
