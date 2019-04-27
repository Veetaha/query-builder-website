import { NestFactory            } from '@nestjs/core';
import { ValidationPipe         } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import Morgan from 'morgan';


import { AppModule     } from '@modules/app.module';
import { ConfigService } from '@modules/config/config.service';
import { LoggerService } from '@utils/logger/logger.service';


async function bootstrap() {
    const app    = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    const logger = app.get(LoggerService);

    await app
        .useGlobalPipes(new ValidationPipe({ transform: true }))
        .useStaticAssets(config.frontendPublicDir)
        .use(Morgan('dev'))
        .listen(config.port);
        
    logger.info(`🚀  Server is listening on port ${config.port}`);
}

bootstrap()
    .catch(err => console.error('Bootstrapping error:', err));
      