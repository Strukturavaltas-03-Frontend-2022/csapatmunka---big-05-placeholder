import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from 'src/app/common/model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  entityName: string = 'category';
  apiUrl: string = `${environment.apiUrl}${this.entityName}`;
  private _categories = new BehaviorSubject<Category[]>([]);

  get categories() {
    return this._categories as Observable<Category[]>;
  }

  constructor(private http: HttpClient) {
    this.getAll()
      .pipe(
        tap((categories: Category[]) => {
          this._categories.next(categories);
        })
      )
      .subscribe();
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
