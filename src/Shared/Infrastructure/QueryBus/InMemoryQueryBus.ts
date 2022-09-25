import {Query} from '@project/Shared/Domain/Query';
import {Response} from '@project/Shared/Domain/Response';
import {QueryBus} from '@project/Shared/Domain/QueryBus';
import {QueryHandlersInformation} from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
    constructor(private queryHandlersInformation: QueryHandlersInformation) {}

    ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.search(query);

        return handler.handle(query) as Promise<R>;
    }
}
