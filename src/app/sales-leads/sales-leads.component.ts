import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SalesLeadsService } from './sales-leads.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  displayingRecords = 5;
  totalRecords = 0;
  loading = true;
  sortedColumn = '';
  pageSize = 5;

  constructor(private salesLeadsService: SalesLeadsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getLeads();
  }

  // delete a record from table
  deleteRecord(element) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: element.lead
    });

    //Event after dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: replace with delete API (couldn't found delete API in swagger docs)
        const index = this.leads.filteredData.indexOf(element);
        this.leads.filteredData.splice(index, 1);
        this.leads = new MatTableDataSource(this.leads.filteredData);
        this.leads.sort = this.sort;
        this.leads.paginator = this.paginator;
        this.totalRecords = this.leads.filteredData.length;
        this.updatePagesize(this.paginator);
      }
    });
  }

  // update page size on page chnage events
  updatePagesize(event: any) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayingRecords = (endIndex > this.totalRecords) ? this.totalRecords : endIndex;
  }

  // get leads from server
  getLeads() {
    this.salesLeadsService.getLeads().subscribe(
      (response: any) => {
        this.totalRecords = response.count;
        this.leads = new MatTableDataSource(response.payload);
        this.leads.sort = this.sort;
        this.leads.paginator = this.paginator;
        this.updatePagesize(this.paginator);
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        console.log(error);
      });
  }

  // checking sorted column and highlighting
  sortData(event: Sort) {
    this.sortedColumn = (event.direction !== '') ? event.active : '';
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
