import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SalesLeadsService } from './sales-leads.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sales-leads',
  templateUrl: './sales-leads.component.html',
  styleUrls: ['./sales-leads.component.css']
})
export class SalesLeadsComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
leads: any= [];
displayedColumns: string[] = ['lead', 'rep', 'client', 'value', 'date', 'delete'];

  constructor(private salesLeadsService: SalesLeadsService) {
   }

  ngOnInit() {
    this.salesLeadsService.getLeads().subscribe(
      (response: any) => {
        this.leads = new MatTableDataSource(response.payload);
        this.leads.sort = this.sort;
        this.leads.paginator = this.paginator
      }, (error: any) => {
        console.log(error);
      });
  }

  deleteRecord(index) {
    // TODO: replace with delete API (couldn't found delete API in swagger docs)
    this.leads.filteredData.splice(index,1);
    this.leads = this.leads.filteredData;
  }

}
