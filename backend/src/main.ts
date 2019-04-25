import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule     } from '@modules/app.module';
import { LoggerService } from '@utils/logger/logger.service';
import { ConfigService } from '@modules/config';


async function bootstrap() {
    const app    = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    const logger = app.get(LoggerService);

    await app
        .useGlobalPipes(new ValidationPipe({ transform: true }))
        .useStaticAssets(config.frontendPublicDir)
        .listen(config.port);
        
    logger.info(`🚀  Server is listening on port ${config.port}`);
}

bootstrap()
    .catch(err => console.error('Bootstrapping error:', err));
