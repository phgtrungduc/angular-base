import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
    private static readonly colorInfo = 'background: #0275d8; color: #fff; font-size: 16px;';
    private static readonly colorWarn = 'background: #f0ad4e; color: #fff; font-size: 16px;';
    private static readonly colorSuccess = 'background: #5cb85c; color: #fff; font-size: 16px;';
    private static readonly colorError = 'background: #d9534f; color: #fff; font-size: 16px;';
    private static readonly colorNormal = 'color: #1a0dab; font-size: 12px';

    public static logInfo(ob: any, ...optionalParams: any[]): void {
        if (!ConsoleService.canShowLog()) {
            return;
        }
        optionalParams = [...optionalParams, ConsoleService.colorNormal];

        if (typeof ob === 'string' || typeof ob === 'number') {
            console.log(`%c[${(new Date())}] - ${ob}`, optionalParams.join(';'));
        } else {
            console.log(ob);
        }
    }

    public static logWarn(ob: any, ...optionalParams: any[]): void {
        if (!ConsoleService.canShowLog()) {
            return;
        }

        optionalParams = [...optionalParams, ConsoleService.colorWarn];

        if (typeof ob === 'string' || typeof ob === 'number') {
            console.warn(`%c[${(new Date())}] - ${ob}`, optionalParams.join(';'));
        } else {
            console.warn(ob);
        }
    }

    public static logError(ob: any, ...optionalParams: any[]): void {
        console.error(ob, optionalParams); // use for tracking in trackjs automatic
    }

    private static canShowLog = () => (localStorage['kvdebugger'] || (window as any)['debugger']);

    constructor() { }

    public warn(message: string, module?: string): void {
        if (ConsoleService.canShowLog() && message && message.length > 0) {
            console.log(`%c [${(new Date())}] - ${message}`, ConsoleService.colorWarn);
        }
    }

    public info(message: string, module?: string): void {
        if (ConsoleService.canShowLog() && message && message.length > 0) {
            console.log(`%c [${(new Date())}] - ${message}`, ConsoleService.colorInfo);
        }
    }

    public success(message: string, module?: string): void {
        if (ConsoleService.canShowLog() && message && message.length > 0) {
            console.log(`%c [${(new Date())}] - ${message}`, ConsoleService.colorSuccess);
        }
    }

    public error(message: string, module?: string): void {
        if (message && message.length > 0) {
            console.log(`%c [${(new Date())}] - ${message}`, ConsoleService.colorError);
        }
    }
}
