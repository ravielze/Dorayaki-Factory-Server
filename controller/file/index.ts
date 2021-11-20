import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import FileService from '../../service/file';
import { BaseController, Controller } from '../base';
import { FileControllerError } from './error';

@Service()
class FileController extends BaseController implements Controller {
    basePath = '/file';

    constructor(private readonly service: FileService) {
        super();
        this.router.use(fileUpload({ safeFileNames: true }));
        this.router.post('/', AsyncHandler(this.uploadFile.bind(this)));
    }

    async uploadFile(req: Request, res: Response) {
        if (!req.files) {
            throw FileControllerError.FILE_NOT_FOUND;
        }
        if (!req.files.file) {
            throw FileControllerError.FILE_NOT_FOUND;
        }
        const file: UploadedFile = req.files.file as UploadedFile;

        if (!file.mimetype.startsWith('image/')) {
            throw FileControllerError.FILE_EXTENSION_NOT_SUPPORTED;
        }

        const fileData: string = file.data.toString('base64');
        const result = await this.service.uploadFile(fileData);
        res.return(CreateResponse(ResponseStatus.OK, { url: result }));
    }
}

export default FileController;
