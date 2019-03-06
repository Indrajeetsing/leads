import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesLeadsService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://interview.dxs-platform.com/api';

  getLeads() {
    return this.http.get(`${this.baseUrl}/leads`);
  }

  postLead(leadsItem) {
    return this.http.post(`${this.baseUrl}/leads`, leadsItem);
  }
}
