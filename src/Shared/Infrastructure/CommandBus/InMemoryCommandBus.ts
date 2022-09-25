import {Command} from '@project/Shared/Domain/Command';
import {CommandBus} from '@project/Shared/Domain/CommandBus';
import {CommandHandlersInformation} from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
    constructor(
        private commandHandlersInformation: CommandHandlersInformation
    ) {}

    dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlersInformation.search(command);

        return handler.handle(command);
    }
}
