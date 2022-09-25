import {Controller, Get, HttpCode} from '@nestjs/common';
import {ApiController} from '@project/Project/Shared/Infrastructure/nestjs/api.controller';

@Controller()
export class HealthGetController extends ApiController {
    @Get('/health')
    @HttpCode(200)
    check(): string {
        return 'ok';
    }
}
