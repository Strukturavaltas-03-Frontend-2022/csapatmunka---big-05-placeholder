import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'webshop/src/environments/environment';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  apiUrl: string =environment.apiUrl;
  entityName: string = 'bill';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}${this.entityName}`);
  }

  get(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}${this.entityName}/${id}`);
  }
  create(bill: Bill): Observable<Bill> {
    return this.http.post<Bill> (`${this.apiUrl}${this.entityName}` bill);
   }

  update(user: Bill): Observable<Bill> {
    return this.http.patch<Bill>(
      `${this.apiUrl}${this.entityName}/${bill.id}`,
      bill
    );
  }
  delete(bill: Bill): Observable<Bill> {
    return this.http.delete<Bill> (`${this.apiUrl}${this.entityName}/${bill.id}`);
   }
}
