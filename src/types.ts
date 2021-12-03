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

import type { LogType } from '@egomobile/log';
import type { Logger } from 'winston';

/**
 * Options for 'useWinstonLogger()' function.
 */
export interface IUseWinstonLoggerOptions {
    /**
     * The default type. Default is 'Debug'.
     */
    defaultType?: LogTypeOption | undefined | null;
    /**
     * The logger to use.
     */
    logger: WinstonLoggerOption;
}

/**
 * Log type or a function, that provides it.
 */
export type LogTypeOption = LogType | LogTypeProvider;

/**
 * A function, that returns a log type.
 *
 * @returns {LogType} The log type.
 */
export type LogTypeProvider = () => LogType;

/**
 * A logger or a function that returns it.
 */
export type WinstonLoggerOption = Logger | WinstonLoggerProvider;

/**
 * A function, that returns a logger.
 *
 * @returns {Logger} The logger.
 */
export type WinstonLoggerProvider = () => Logger;
