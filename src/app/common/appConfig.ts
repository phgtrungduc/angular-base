import { InjectionToken } from '@angular/core';

export interface IAppConfig {
    appName: string;
    multipleShopsSupport: boolean,
    saveOffline: boolean,
    pullAfter: {jobName: string, jobExecute: any}[]
}

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
