import {Query} from '@project/Shared/Domain/Query';
import {QueryHandler} from '@project/Shared/Domain/QueryHandler';
import {Response} from '@project/Shared/Domain/Response';
import {QueryNotRegisteredError} from '@project/Shared/Domain/QueryNotRegisteredError';

export class QueryHandlersInformation {
    private queryHandlersMap?: Map<Query, QueryHandler<Query, Response>>;

    constructor(
        private readonly handlers: Array<QueryHandler<Query, Response>> = []
    ) {}

    public add(handler: QueryHandler<Query, Response>): void {
        this.handlers.push(handler);
    }

    private formatHandlers(): Map<Query, QueryHandler<Query, Response>> {
        const handlersMap = new Map<Query, QueryHandler<Query, Response>>();

        this.handlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }

    public search(query: Query): QueryHandler<Query, Response> {
        if (!this.queryHandlersMap) {
            this.queryHandlersMap = this.formatHandlers();
        }

        const queryHandler = this.queryHandlersMap.get(query.constructor);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }
}
