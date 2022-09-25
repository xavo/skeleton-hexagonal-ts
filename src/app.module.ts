import {Module} from '@nestjs/common';
import {HealthGetController} from './Project/Shared/Infrastructure/nestjs/health.get.controller';
import {SharedModule} from './Shared/Infrastructure/DependencyInjection/Shared.module';

@Module({
    imports: [SharedModule],
    controllers: [HealthGetController],
})
export class AppModule {}
