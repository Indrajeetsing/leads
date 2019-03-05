import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesLeadsComponent } from './sales-leads/sales-leads.component';

const routes: Routes = [
  { path: 'sales-leads', component: SalesLeadsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
