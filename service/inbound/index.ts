import { Request } from 'express';
import { Service } from 'typedi';
import { PaginationResult } from '../../model/dto/abstract';
import InboundRepository from '../../repository/inbound';
import DorayakiService from '../dorayaki';
import IngredientService from '../ingredient';
import { InboundServiceError } from './error';

@Service()
class InboundService {
    constructor(
        private readonly repo: InboundRepository,
        private readonly doraService: DorayakiService,
        private readonly ingrService: IngredientService
    ) {}
}

export default InboundService;
