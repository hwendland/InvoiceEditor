import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoSelectionComponent } from './no-selection/no-selection.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

const appRoutes: Routes = [
  { path: '', component: NoSelectionComponent },
  { path: 'edit/:index', component: InvoiceEditComponent },
  { path: 'edit/new', component: InvoiceEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
