import { Service } from 'typedi';
import Config from '../../app/config';
import Axios from 'axios';

@Service()
class FileService {
    constructor(private readonly config: Config) {}

    async uploadFile(fileData: string): Promise<string> {
        const param = new URLSearchParams();
        param.set('expiration', this.config.imgExpiration);
        param.set('key', this.config.imgBBApiKey);
        param.set('image', fileData);
        const response = await Axios.post(`https://api.imgbb.com/1/upload`, param, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                return {};
            });

        if (!response || !response.data || !response.data.image || !response.data.image.url) {
            throw new Error('failed to upload image to imgbb.com');
        }

        return response.data.image.url;
    }
}
export default FileService;
