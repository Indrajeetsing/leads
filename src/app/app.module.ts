import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatRippleModule,
  MatListModule,
MatIconModule,
MatPaginatorModule,
MatSortModule,
MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BannerMessageComponent } from './banner-message/banner-message.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SalesLeadsComponent } from './sales-leads/sales-leads.component';
import { SalesLeadsService } from './sales-leads/sales-leads.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BannerMessageComponent,
    ToolbarComponent,
    SalesLeadsComponent,
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
    MatTableModule
  ],
  providers: [SalesLeadsService],
  bootstrap: [AppComponent],
  // exports: [CurrencyPipe]
})
export class AppModule { }
