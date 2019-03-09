import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SalesLeadsService } from './sales-leads.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-sales-leads',
  templateUrl: './sales-leads.component.html',
  styleUrls: ['./sales-leads.component.css']
})

export class SalesLeadsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  leads: any = [];
  displayedColumns: string[] = ['lead', 'rep', 'client', 'value', 'date', 'delete'];
  pageSize = 5;
  totalRecords;
  loading = true;
  sortedColumn = '';

  constructor(private salesLeadsService: SalesLeadsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getLeads();
  }

  // delete a record from table
  deleteRecord(element) {
    // TODO: replace with delete API (couldn't found delete API in swagger docs)
    const index = this.leads.filteredData.indexOf(element);
    this.leads.filteredData.splice(index, 1);
    this.leads = new MatTableDataSource(this.leads.filteredData);
    this.leads.sort = this.sort;
    this.leads.paginator = this.paginator;
    this.totalRecords = this.leads.filteredData.length;
    this.pageSize = this.leads.connect().value.length;
  }

  // update page size on page chnage events
  updatePagesize(event: any) {
    this.totalRecords = event.length;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const itemsShowed = this.leads.filteredData.slice(startIndex, endIndex);
    this.pageSize = itemsShowed.length;
  }

  // get leads from server
  getLeads() {
    this.salesLeadsService.getLeads().subscribe(
      (response: any) => {
        this.leads = new MatTableDataSource(response.payload);
        this.leads.sort = this.sort;
        this.leads.paginator = this.paginator
        this.totalRecords = response.count;
        this.pageSize = this.leads.connect().value.length;
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        console.log(error);
      });
  }

  // checking sorted column and highlighting
  sortData(event: Sort) {
    if (event.direction !== '') {
      this.sortedColumn = event.active;
    } else {
      this.sortedColumn = '';
    }
  }

  // open dialog and add lead
  addLead() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
    });

    //Event after dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'successfully added') {
        this.getLeads();
      }
    });
  }
}
