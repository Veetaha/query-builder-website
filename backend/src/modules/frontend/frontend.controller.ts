import * as Express from 'express'; 
import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';

@Controller()
export class FrontendController {

    constructor(private readonly config: ConfigService) {}

    @Get('*')
    getIndexHtml(@Res() res: Express.Response) {
        res.sendFile(this.config.frontendIndexHtmlPath);
    }

}