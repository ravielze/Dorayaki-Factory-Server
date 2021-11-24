import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import { Service } from 'typedi';
import { validate, validateArray } from '../../common/validation';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { ConvertRecipe } from '../../model/dto/dorayaki';
import { CreateDorayakiDTO } from '../../model/dto/dorayaki/create';
import DorayakiService from '../../service/dorayaki';
import { BaseController, Controller } from '../base';

@Service()
class DorayakiController extends BaseController implements Controller {
    basePath = '/dorayaki';

    constructor(private readonly service: DorayakiService) {
        super();
        this.router.post('/', AsyncHandler(this.createDorayakiRecipe.bind(this)));
    }

    async createDorayakiRecipe(req: Request, res: Response) {
        const item: CreateDorayakiDTO = new CreateDorayakiDTO(req.body);
        await validate(item);
        await validateArray(item.recipes, (each, index) => {
            each.property = each.property + ` (Array Index: ${index})`;
            return each;
        });

        req.transaction.use();
        const rawResult = await this.service.createDorayakiRecipe(req, item);
        const result = rawResult.map((i) => ConvertRecipe(i));
        req.transaction.commit();

        res.json(CreateResponse(ResponseStatus.OK, result));
    }
}

export default DorayakiController;
