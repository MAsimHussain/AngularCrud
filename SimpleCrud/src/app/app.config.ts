import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
export const appConfig: ApplicationConfig = {
 
  providers: [
   
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimations(),
     provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar :true,
      closeButton:true,
      tapToDismiss:true,
    }),  // Toastr providers
    
  ]
};


