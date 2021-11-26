import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { InboundDAO } from '../../model/dao/inbound';
import { PaginationResult } from '../../model/dto/abstract';
import { InboundStatus } from '../../common/inboundStatus';

@Service()
class InboundRepository extends BaseRepository<InboundDAO> {
    constructor() {
        super();
    }

    async saveInbound(req: Request, item: InboundDAO) {
        const repo: Repository<InboundDAO> = await this.getRepository(req, InboundDAO);
        return repo.save(item);
    }
    async getInbound(req: Request, id: number): Promise<InboundDAO | undefined> {
        const repo: Repository<InboundDAO> = await this.getRepository(req, InboundDAO);

        return repo.findOne(id, { relations: ['dorayaki'] });
    }
    async getAllInbounds(
        req: Request,
        page: number,
        itemPerPage: number
    ): Promise<PaginationResult<InboundDAO>> {
        const repo: Repository<InboundDAO> = await this.getRepository(req, InboundDAO);

        return this.getAll(repo, page, itemPerPage, {
            order: { createdAt: 'DESC' },
            relations: ['dorayaki'],
        });
    }

    async updateStatus(req: Request, id: number, status: InboundStatus) {
        const repo: Repository<InboundDAO> = await this.getRepository(req, InboundDAO);
        await repo.update(id, { status });
    }
}
export default InboundRepository;
