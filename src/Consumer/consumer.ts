import 'source-map-support/register';
import {NestFactory} from '@nestjs/core';
import {DataConsumerModule} from './DataConsumerModule';
import {WinstonLogger} from '@project/Shared/Infrastructure/WinstonLogger';

async function bootstrap() {
    const logger = ['staging', 'production'].includes(
        String(process.env.NODE_ENV)
    )
        ? new WinstonLogger()
        : undefined;

    const app = await NestFactory.create(DataConsumerModule, {
        logger,
    });

    if (process.env.NODE_ENV !== 'test') {
        app.enableShutdownHooks();
    }

    await app.listen(4000);
}

void bootstrap();
