import {Module} from '@nestjs/common';
import {CommandHandlersInformation} from 'src/Shared/Infrastructure/CommandBus/CommandHandlersInformation';
import {InMemoryCommandBus} from 'src/Shared/Infrastructure/CommandBus/InMemoryCommandBus';
import {InMemoryQueryBus} from 'src/Shared/Infrastructure/QueryBus/InMemoryQueryBus';
import {QueryHandlersInformation} from 'src/Shared/Infrastructure/QueryBus/QueryHandlersInformation';
import {DomainEventMapping} from '../EventBus/DomainEventMapping';
import {WinstonLogger} from '../WinstonLogger';

@Module({
    imports: [],
    providers: [
        {
            provide: InMemoryQueryBus,
            useFactory: function (
                queryHandler: QueryHandlersInformation
            ): InMemoryQueryBus {
                return new InMemoryQueryBus(queryHandler);
            },
            inject: [QueryHandlersInformation],
        },
        {
            provide: InMemoryCommandBus,
            useFactory: function (
                commandHandlers: CommandHandlersInformation
            ): InMemoryCommandBus {
                return new InMemoryCommandBus(commandHandlers);
            },
            inject: [CommandHandlersInformation],
        },
        {
            provide: DomainEventMapping,
            useFactory: function (): DomainEventMapping {
                return new DomainEventMapping();
            },
        },
        {
            provide: WinstonLogger,
            useFactory: function (): WinstonLogger {
                return new WinstonLogger();
            },
        },
        {
            provide: 'CommandBus',
            useExisting: InMemoryCommandBus,
        },
        {
            provide: 'QueryBus',
            useExisting: InMemoryQueryBus,
        },
        {
            provide: 'Logger',
            useExisting: WinstonLogger,
        },
        CommandHandlersInformation,
        QueryHandlersInformation,
    ],
    exports: ['CommandBus', 'QueryBus', 'Logger', QueryHandlersInformation],
})
export class SharedModule {}
