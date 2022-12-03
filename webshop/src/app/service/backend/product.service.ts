import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  entityName: string = 'product'
  apiUrl: string = `${environment.apiURL}${this.entityName}`

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  get(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product[]>{
    return this.http.post<Product[]>(this.apiUrl, product);
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  remove(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
