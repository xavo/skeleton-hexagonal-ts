import {
    createLogger,
    format,
    transports as WinstonTransports,
    LoggerOptions as WinstonLoggerOptions,
    Logger as BaseWinstonLogger,
} from 'winston';
import * as Transport from 'winston-transport';
import {LoggerService, LogLevel as NestLogLevel} from '@nestjs/common';
import Logger from '@project/Shared/Domain/Logger';

interface TransportsInterface {
    console: Transport;
}

type LogLevel = NestLogLevel | 'info';

export class WinstonLogger implements LoggerService, Logger {
    public readonly logger: BaseWinstonLogger;

    constructor(level: LogLevel = 'info') {
        const transports: TransportsInterface = {
            console: new WinstonTransports.Console({level}),
        };

        const options: WinstonLoggerOptions = {
            format: format.combine(
                format.errors({stack: true}),
                format.timestamp({format: 'isoDateTime'}),
                format.json()
            ),
            transports: [transports.console],
            handleExceptions: true,
            exceptionHandlers: [transports.console],
            // @see https://github.com/winstonjs/winston/pull/1842
            // handleRejections: true,
            // rejectionHandlers: [transports.console],
            exitOnError: true,
        };

        this.logger = createLogger(options);
    }

    log(message: string, ...otherParams: unknown[]): void {
        this.info(message, ...otherParams);
    }

    info(message: string, ...otherParams: unknown[]): void {
        this.logger.info(message, ...otherParams);
    }

    error(message: string | Error, ...otherParams: unknown[]): void {
        //Nestjs uses second argument of directly as "stack"
        if (typeof otherParams[0] === 'string') {
            otherParams[0] = {
                error: {kind: 'Error', message, stack: otherParams[0]},
            };
        }

        this.logger.error(message as string, ...otherParams);
    }

    warn(message: string, ...otherParams: unknown[]): void {
        this.logger.warn(message, ...otherParams);
    }

    debug(message: string, ...otherParams: unknown[]): void {
        this.logger.debug(message, ...otherParams);
    }

    verbose(message: string, ...otherParams: unknown[]): void {
        this.logger.verbose(message, ...otherParams);
    }
}
