import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoSelectionComponent } from './no-selection/no-selection.component';

const appRoutes: Routes = [
  { path: '', component: NoSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
