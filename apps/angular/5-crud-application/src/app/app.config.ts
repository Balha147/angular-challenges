import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './errors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr(), withInterceptors([errorInterceptor]))],
};
