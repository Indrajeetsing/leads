import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isOpen = false;
  sidebar = [
    { 'LABEL': 'Sales Leads', 'ICON': 'list', 'PATH': 'sales-leads' },
    { 'LABEL': 'Contacts', 'ICON': 'people', 'PATH': 'contacts' },
    { 'LABEL': 'Calendar', 'ICON': 'calendar_today', 'PATH': 'calendar' },
    { 'LABEL': 'Reports', 'ICON': 'list_alt', 'PATH': 'reports' }]
  constructor() { }
}
