import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatRippleModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BannerMessageComponent } from './banner-message/banner-message.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SalesLeadsComponent } from './sales-leads/sales-leads.component';
import { SalesLeadsService } from './sales-leads/sales-leads.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BannerMessageComponent,
    ToolbarComponent,
    SalesLeadsComponent,
    DialogComponent,
    // CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRippleModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSortModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [SalesLeadsService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
