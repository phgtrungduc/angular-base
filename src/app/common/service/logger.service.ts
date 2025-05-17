import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConsoleService } from './console.service';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

    /***
     * Return timeout Ms
     * @param length
     * @private
     */
    static _getTimeOutByLengthOfMessage(length: number): number {
        const minTimeOut = 3000; // ms
        const maxTimeOut = 8000; // ms
        const millisecondsForCharacter = 50;
        return Math.min(Math.max(length * millisecondsForCharacter, minTimeOut), maxTimeOut);
    }

    constructor(private readonly toastr: ToastrService) {
    }

    info(message: string, title?: string, timeout?: number): void {
        this.toastr.info(message, title, {
            timeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
            extendedTimeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
        });
    }

    success(message: string, title?: string, timeout?: number): void {
        this.toastr.success(message, title, {
            timeOut: LoggerService._getTimeOutByLengthOfMessage(message.length),
            extendedTimeOut: LoggerService._getTimeOutByLengthOfMessage(message.length),
        });
    }

    error(message: string, title?: string, options?: any, timeout?: number): void {
        this.toastr.error(message, title, {
            ...options, ...{
                timeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
                extendedTimeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
            },
        });
        ConsoleService.logInfo({message: message, title: title, options: options});
    }

    warn(message: string, title?: string, timeout?: number): void {
        this.toastr.warning(message, title, {
            timeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
            extendedTimeOut: timeout || LoggerService._getTimeOutByLengthOfMessage(message.length),
        });
        ConsoleService.logInfo({message: message, title: title});
    }
}
