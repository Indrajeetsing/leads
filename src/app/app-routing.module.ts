import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesLeadsComponent } from './sales-leads/sales-leads.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ReportsComponent } from './reports/reports.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'sales-leads', component: SalesLeadsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
