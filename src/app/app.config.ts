import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { initialState, reducers } from './store/reducers/reducers';
import { StartupService } from './startup.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/interceptors/auth-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
// import { BrowserModule } from '@angular/platform-browser';
// import { ModalModule } from 'ngx-bootstrap/modal';

function initializeApp(): () => Promise<void> {
  return () => new Promise(async (resolve) => {
    await inject(StartupService).init();
    console.log('Cpanel Started');
    resolve();
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(initializeApp()),
    provideStore(reducers, { initialState: initialState }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    // importProvidersFrom(BrowserModule, ModalModule.forRoot()),
  ]
};
