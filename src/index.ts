// This file is part of the @egomobile/winston-log distribution.
// Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
//
// @egomobile/winston-log is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, version 3.
//
// @egomobile/winston-log is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import _winston from 'winston';
import log, { LoggerMiddleware, LogType } from '@egomobile/log';
import { createLogger, format, Logger, transports } from 'winston';
import type { IUseWinstonLoggerOptions, LogTypeProvider, WinstonLoggerOption, WinstonLoggerProvider } from './types';

/**
 * Creates a new middleware, that uses a winston as base logger.
 *
 * @example
 * ```
 * import log, { useWinstonLogger } from "@egomobile/winston-log"
 *
 * log.reset()
 *
 * // add as additional middleware
 * // use a default console based logger
 * // implemented with winston
 * log.use(useWinstonLogger())
 *
 * log("foo")  // default: debug
 * log.debug("foo")  // debug
 * log.error("foo")  // error
 * log.warn("foo")  // warning
 * log.info("foo")  // information
 * log.trace("foo")  // trace
 * ```
 *
 * @param {WinstonLoggerOption|null|undefined} [loggerOrProvider] The base logger or the function that provides it.
 * @param {IUseWinstonLoggerOptions|null|undefined} [options] Custom options.
 *
 * @returns {LoggerMiddleware} The new middleware.
 */
export function useWinstonLogger(loggerOrProvider?: WinstonLoggerOption | null | undefined, options?: IUseWinstonLoggerOptions | undefined | null): LoggerMiddleware {
    let getLogger: WinstonLoggerProvider;
    if (loggerOrProvider) {
        if (typeof loggerOrProvider === 'function') {
            getLogger = loggerOrProvider as WinstonLoggerProvider;
        } else {
            getLogger = () => loggerOrProvider as Logger;
        }
    } else {
        // create a default logger
        // that outputs to the console

        const baseLogger = createLogger({
            level: process.env.NODE_ENV?.toLowerCase().trim() === 'development' ? 'debug' : 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            transports: [
            ]
        });

        // console output
        baseLogger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }));

        getLogger = () => baseLogger;
    }

    if (typeof getLogger !== 'function') {
        throw new TypeError('loggerOrProvider must be a logger object or a function that provides it');
    }

    // define the function, that provides the default
    // log type
    let getDefaultLogType: LogTypeProvider;
    if (options) {
        if (typeof options.defaultType === 'function') {
            getDefaultLogType = options.defaultType as LogTypeProvider;
        } else {
            getDefaultLogType = () => options.defaultType as LogType;
        }
    } else {
        getDefaultLogType = () => LogType.Debug;  // default
    }

    if (typeof getDefaultLogType !== 'function') {
        throw new TypeError('options.defaultType must be a logger object or a function that provides it.');
    }

    return (inputType, args) => {
        const baseLogger = getLogger();

        let type = inputType;
        if (type === LogType.Default) {
            type = getDefaultLogType();
        }

        let l: (message: string, ...meta: any[]) => void;
        if (type === LogType.Error) {
            l = baseLogger.error;
        } else if (type === LogType.Info) {
            l = baseLogger.info;
        } else if (type === LogType.Trace) {
            l = baseLogger.verbose;
        } else if (type === LogType.Warn) {
            l = baseLogger.warn;
        } else {
            l = baseLogger.debug;  // default
        }

        (l as any).bind(baseLogger)(...args);
    };
}

// also export anything from @egomobile/log
export * from '@egomobile/log';

// export winston
export const winston = _winston;

// make default logger instance available as
// default export
export default log;
