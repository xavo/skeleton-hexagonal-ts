import {Controller, Inject} from '@nestjs/common';
import {Command} from 'src/Shared/Domain/Command';
import {CommandBus} from 'src/Shared/Domain/CommandBus';
import {Query} from 'src/Shared/Domain/Query';
import {QueryBus} from 'src/Shared/Domain/QueryBus';
import {Response} from 'src/Shared/Domain/Response';

@Controller()
export abstract class ApiController {
    static DEFAULT_LIMIT = 100;
    static DEFAULT_OFFSET = 0;

    constructor(
        @Inject('CommandBus') private commandBus: CommandBus,
        @Inject('QueryBus') private queryBus: QueryBus
    ) {}

    async dispatch(command: Command): Promise<void> {
        await this.commandBus.dispatch(command);
    }

    async ask<T extends Response>(query: Query): Promise<T> {
        return await this.queryBus.ask<T>(query);
    }

    protected calculateNextPage(
        total: number,
        offset?: number,
        limit?: number
    ): number {
        limit = limit ?? ApiController.DEFAULT_LIMIT;
        offset = offset ?? ApiController.DEFAULT_OFFSET;

        if (0 === total || total <= limit || total <= offset) {
            return 0;
        }

        return offset + limit >= total ? total : offset + limit;
    }
}
