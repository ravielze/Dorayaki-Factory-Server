import { Service } from 'typedi';
import Config from '../../app/config';
import Nodemailer, { Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import UserService from '../user';
import { Request } from 'express';

@Service()
class MailService {
    private readonly mailer: Transporter<SentMessageInfo>;
    constructor(private readonly config: Config, private readonly userService: UserService) {
        this.mailer = Nodemailer.createTransport({
            host: this.config.smtpHost,
            port: this.config.smtpPort,
            secure: false,
            requireTLS: true,
            auth: {
                user: this.config.smtpUser,
                pass: this.config.smtpPass,
            },
            logger: true,
        });
    }

    async sendMail(req: Request, subject: string, message: string) {
        const adminEmails: string[] = await this.userService.getAllEmail(req);
        adminEmails.forEach(async (to) => {
            await this.mailer.sendMail({
                from: 'Backend Pabrik <backendpabrik@sabundanistirahat.xyz>',
                to,
                subject,
                text: message,
            });
        });
    }
}
export default MailService;
