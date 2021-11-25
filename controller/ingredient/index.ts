import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { ParseIntOrDefault } from '../../common/parser';
import { validate } from '../../common/validation';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { PaginationResult } from '../../model/dto/abstract';
import { ConvertIngredient, IngredientDTO } from '../../model/dto/ingredient';
import { CreateIngredientDTO } from '../../model/dto/ingredient/create';
import { UpdateIngredientDTO } from '../../model/dto/ingredient/update';
import IngredientService from '../../service/ingredient';
import { BaseController, Controller } from '../base';
import UserMiddleware from '../user/middleware';

@Service()
class IngredientController extends BaseController implements Controller {
    basePath = '/ingredient';

    constructor(private readonly service: IngredientService, private readonly mw: UserMiddleware) {
        super();
        this.router.post('/', this.mw.isAuthorized(), AsyncHandler(this.create.bind(this)));
        this.router.get(
            '/',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.getAll.bind(this))
        );
        this.router.get(
            '/minified',
            this.mw.hasAPIKeyOrIsAuthorized(),
            AsyncHandler(this.getAllMinified.bind(this))
        );
        this.router.put(
          "/",
          this.mw.isAuthorized(),
          AsyncHandler(this.update.bind(this))
        )
    }

    async create(req: Request, res: Response) {
        const item: CreateIngredientDTO = new CreateIngredientDTO(req.body);
        await validate(item);

        const result = await this.service.createIngredient(req, item);
        res.return(CreateResponse(ResponseStatus.OK, ConvertIngredient(result)));
    }

    async getAll(req: Request, res: Response) {
        const page: number = ParseIntOrDefault(1, req.query.page as string | undefined, 'Page');
        const itemPerPage: number = ParseIntOrDefault(
            10,
            req.query.items_per_page as string | undefined,
            'ItemsPerPage'
        );

        const result = await this.service.getIngredients(req, page, itemPerPage);
        const resultDto: PaginationResult<IngredientDTO> = {
            ...result,
            items: result.items.map((i) => ConvertIngredient(i)),
        };
        res.return(CreateResponse(ResponseStatus.OK, resultDto));
    }

    async getAllMinified(req: Request, res: Response) {
        const result = await this.service.getIngredientsMinified(req);
        res.return(CreateResponse(ResponseStatus.OK, result));
    }

    async update(req: Request, res: Response) {
        const item: UpdateIngredientDTO = new UpdateIngredientDTO(req.body);
        await validate(item);

        await this.service.updateIngredient(req, item);
        res.return(CreateResponse(ResponseStatus.OK));
    }
}

export default IngredientController;
