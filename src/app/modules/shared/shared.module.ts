import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { DialogueConfirmComponent } from './components/dialogue-confirm/dialogue-confirm.component';
import { DialogueAlertComponent } from './components/dialogue-alert/dialogue-alert.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    DialogueConfirmComponent,
    DialogueAlertComponent,
    MainNavComponent,
    SearchBarComponent,
    ClickStopPropagationDirective

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule

  ],
  exports: [
    ClickStopPropagationDirective,
    MainNavComponent,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [DialogueConfirmComponent, DialogueAlertComponent]

})
export class SharedModule { }
