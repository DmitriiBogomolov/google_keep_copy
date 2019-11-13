
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeRu from '@angular/common/locales/Ru';
import { registerLocaleData } from '@angular/common';

import { SharedModule } from './modules/shared/shared.module';
import { KeeperModule } from "./modules/keeper/keeper.module";


registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    KeeperModule
  ],
  providers: [
      { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }
