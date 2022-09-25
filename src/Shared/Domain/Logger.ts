export default interface Logger {
    debug(message: string, ...otherArgs: unknown[]): void;

    info(message: string, ...otherArgs: unknown[]): void;

    warn(message: string, ...otherArgs: unknown[]): void;

    error(message: string | Error, ...otherArgs: unknown[]): void;
}
