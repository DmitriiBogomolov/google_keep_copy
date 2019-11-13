import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatAutocompleteModule,
         MatSidenavModule, MatIconModule, MatListModule,
         MatFormFieldModule, MatInputModule, MatDialogModule,
         MatMenuModule, MatTooltipModule, MatDatepickerModule,
         MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS,
         MAT_DATE_LOCALE, MatCheckboxModule, MatProgressBarModule,
         MatChipsModule, MatSnackBarModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatChipsModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [modules],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'ru' }
  ]
})
export class MaterialModule { }
