import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BaseRepository } from '..';
import { Request } from 'express';
import { DorayakiDAO } from '../../model/dao/dorayaki';
import { PaginationResult } from '../../model/dto/abstract';
import { InboundDAO } from '../../model/dao/inbound';

@Service()
class InboundRepository extends BaseRepository<InboundDAO> {
    constructor() {
        super();
    }
}
export default InboundRepository;
