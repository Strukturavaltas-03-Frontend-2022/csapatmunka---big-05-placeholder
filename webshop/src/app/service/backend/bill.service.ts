import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/common/model/bill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiURL: string =environment.apiURL;
  entityName: string = 'bill';

  constructor(private http: HttpClient,) { }
  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiURL}${this.entityName}`);
  }

  get(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiURL}${this.entityName}/${id}`);
  }
  create(bill: Bill): Observable<Bill> {
    return this.http.post<Bill> (`${this.apiURL}${this.entityName}`, bill);
   }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(
      `${this.apiURL}${this.entityName}/${bill.id}`,
      bill
    );
  }
  delete(bill: Bill): Observable<Bill> {
    return this.http.delete<Bill> (`${this.apiURL}${this.entityName}/${bill.id}`);
   }

}
