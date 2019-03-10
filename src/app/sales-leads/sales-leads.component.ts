import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, MatDialog } from '@angular/material';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SalesLeadsService } from './sales-leads.service';

@Component({
  selector: 'app-sales-leads',
  templateUrl: './sales-leads.component.html',
  styleUrls: ['./sales-leads.component.scss']
})

export class SalesLeadsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;
  leads = new MatTableDataSource<lead>([]);
  displayedColumns: string[] = ['select', 'lead', 'rep', 'client', 'value', 'date', 'delete'];
  displayingRecords = 5;
  totalRecords = 0;
  loading = true;
  sortedColumn = '';
  pageSize = 5;
  selection = new SelectionModel(true, []);

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
        this.leads = new MatTableDataSource<lead>(this.leads.filteredData);
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
    return event;
  }

  // get leads from server
  getLeads() {
    this.salesLeadsService.getLeads().subscribe(
      (response: any) => {
        this.totalRecords = response.count;
        this.leads = new MatTableDataSource<lead>(response.payload);
        this.selection = new SelectionModel<lead>(true, []);
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
        this.loading = true;
        this.getLeads();
      }
    });
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.leads.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.leads.data.forEach(row => this.selection.select(row));
  }

  // deleteing selected records
  deleteSelectedRows() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: `${this.selection.selected.length} records`
    });

    //Event after dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selection.selected.forEach(item => {
          const index: number = this.leads.filteredData.findIndex(d => d === item);
          this.leads.filteredData.splice(index, 1)
        });
        this.leads = new MatTableDataSource<lead>(this.leads.filteredData);
        this.leads.sort = this.sort;
        this.leads.paginator = this.paginator;
        this.totalRecords = this.leads.filteredData.length;
        this.updatePagesize(this.paginator);
        this.selection = new SelectionModel<lead>(true, []);
      }
    });
  }
}

export interface lead {
  lead: string;
  rep: string;
  client: string;
  value: number;
  date: number;
}
