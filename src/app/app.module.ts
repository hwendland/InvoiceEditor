import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { NoSelectionComponent } from './no-selection/no-selection.component';
import { FileIoComponent } from './file-io/file-io.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceEditComponent,
    NoSelectionComponent,
    FileIoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
