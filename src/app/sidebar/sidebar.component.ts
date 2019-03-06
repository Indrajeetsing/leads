import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen = false;
  sidebar = [
    { 'LABEL': 'Sales Leads', 'ICON': 'list', 'PATH': 'sales-leads' },
    { 'LABEL': 'Contacts', 'ICON': 'contacts', 'PATH': 'contacts' }]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToRoute(menu) {
    this.router.navigate([menu.PATH]);
  }
}
