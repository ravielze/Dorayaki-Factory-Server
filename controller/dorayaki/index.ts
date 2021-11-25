import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { ParseIntOrDefault } from '../../common/parser';
import { validate, validateArray } from '../../common/validation';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { PaginationResult } from '../../model/dto/abstract';
import { ConvertDorayaki, DorayakiDTO } from '../../model/dto/dorayaki';
import { CreateDorayakiDTO } from '../../model/dto/dorayaki/create';
import DorayakiService from '../../service/dorayaki';
import { BaseController, Controller } from '../base';
import UserMiddleware from '../user/middleware';

@Service()
class DorayakiController extends BaseController implements Controller {
    basePath = '/dorayaki';

    constructor(private readonly service: DorayakiService, private readonly mw: UserMiddleware) {
        super();
        this.router.post(
            '/',
            this.mw.isAuthorized(),
            AsyncHandler(this.createDorayakiRecipe.bind(this))
        );
        this.router.get(
            '/',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.getDorayakis.bind(this))
        );
    }

    async createDorayakiRecipe(req: Request, res: Response) {
        const item: CreateDorayakiDTO = new CreateDorayakiDTO(
            req.body
        ).RemoveDuplicateIngredientsID();
        await validate(item);
        await validateArray(item.recipes, (each, index) => {
            each.property = each.property + ` (Array Index: ${index})`;
            return each;
        });

        req.transaction.use();
        const result = await this.service.createDorayakiRecipe(req, item);
        req.transaction.commit();

        res.json(CreateResponse(ResponseStatus.OK, ConvertDorayaki(result)));
    }

    async getDorayakis(req: Request, res: Response) {
        const page: number = ParseIntOrDefault(1, req.query.page as string | undefined, 'Page');
        const itemPerPage: number = ParseIntOrDefault(
            10,
            req.query.items_per_page as string | undefined,
            'ItemsPerPage'
        );

        const result = await this.service.getDorayakis(req, page, itemPerPage);
        const resultDto: PaginationResult<DorayakiDTO> = {
            ...result,
            items: result.items.map((i) => ConvertDorayaki(i)),
        };
        res.json(CreateResponse(ResponseStatus.OK, resultDto));
    }
}

export default DorayakiController;
