import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isOpen = false;
  sidebar = [
    { 'LABEL': 'Sales Leads', 'ICON': 'list', 'PATH': 'sales-leads' },
    { 'LABEL': 'Contacts', 'ICON': 'contacts', 'PATH': 'contacts' },
    { 'LABEL': 'Calendar', 'ICON': 'calendar_today', 'PATH': 'calendar' },
    { 'LABEL': 'Reports', 'ICON': 'list_alt', 'PATH': 'reports' }]
  constructor(private router: Router) { }

  goToRoute(menu) {
    this.router.navigate([menu.PATH]);
  }
}
