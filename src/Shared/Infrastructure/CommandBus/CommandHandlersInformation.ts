import {Command} from '@project/Shared/Domain/Command';
import {CommandHandler} from '@project/Shared/Domain/CommandHandler';
import {CommandNotRegisteredError} from '@project/Shared/Domain/CommandNotRegisteredError';

export class CommandHandlersInformation {
    private commandHandlersMap?: Map<Command, CommandHandler<Command>>;

    constructor(
        private readonly handlers: Array<CommandHandler<Command>> = []
    ) {}

    public add(commandHandler: CommandHandler<Command>): void {
        this.handlers.push(commandHandler);
    }

    private formatHandlers(): Map<Command, CommandHandler<Command>> {
        const handlersMap = new Map<Command, CommandHandler<Command>>();

        this.handlers.forEach((commandHandler) => {
            handlersMap.set(commandHandler.subscribedTo(), commandHandler);
        });

        return handlersMap;
    }

    public search(command: Command): CommandHandler<Command> {
        if (!this.commandHandlersMap) {
            this.commandHandlersMap = this.formatHandlers();
        }

        const commandHandler = this.commandHandlersMap.get(command.constructor);

        if (!commandHandler) {
            throw new CommandNotRegisteredError(command);
        }

        return commandHandler;
    }
}
