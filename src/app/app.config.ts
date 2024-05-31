import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PessoaService } from './pessoa.service';
import { BsModalService } from 'ngx-bootstrap/modal';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideClientHydration(),
      provideHttpClient(),
      PessoaService,
       importProvidersFrom(HttpClientModule),
        provideHttpClient(withFetch()),
        BsModalService,
        ]
};


