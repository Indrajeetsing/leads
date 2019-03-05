import { animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '200px;',
      })),
      state('closed', style({
        width: '56px;',
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ])
  ]
})
export class SidebarComponent implements OnInit {

isOpen = false;
sidebar = [
  { 'LABEL': 'Sales Leads', 'ICON': 'list'},
  { 'LABEL': 'Contacts', 'ICON': 'contacts'}]
  constructor() { }

  ngOnInit() {
  }

}
