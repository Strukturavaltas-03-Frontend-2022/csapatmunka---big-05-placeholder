import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/common/model/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  entityName: string = 'order';

  apiUrl: string = `${environment.apiURL}${this.entityName}`

  http: HttpClient = inject(HttpClient)

  constructor(

  ) { }

  getAll(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOne(id:number): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(order:Order): Observable<Order[]>{
    return this.http.post<Order[]>(this.apiUrl, order);
  }

  update(order: Order): Observable<Order>{
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }

  remove(id:number): Observable<Order>{
    return this.http.delete<Order>(`${this.apiUrl}/${id}`);
  }
}
