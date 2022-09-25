import 'source-map-support/register';
import expressWinston from 'express-winston';
import {Request} from 'express';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {WinstonLogger} from 'src/Shared/Infrastructure/WinstonLogger';

async function bootstrap() {
    const logger = ['staging', 'production'].includes(
        String(process.env.NODE_ENV)
    )
        ? new WinstonLogger()
        : undefined;

    const app = await NestFactory.create(AppModule, {cors: true, logger});

    if (process.env.NODE_ENV !== 'test') {
        app.enableShutdownHooks();
    }

    if (logger) {
        app.use(
            expressWinston.logger({
                winstonInstance: logger.logger,
                statusLevels: true,
                skip: (req: Request) => req.method === 'OPTIONS',
                ignoredRoutes: ['/health'],
            })
        );
    }

    await app.listen(3000);
}

void bootstrap();
