import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/common/model/category.model';
import { UiService } from '../common/ui.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  entityName: string = 'category';
  apiUrl: string = `${environment.apiUrl}${this.entityName}`;
  private _categories: Category[] = [];

  get categories() {
    return this._categories;
  }

  constructor(
    private http: HttpClient,
    private uiService: UiService,
  ) {
    this.uiService.loading.next(true);
    this.getAll()
      .pipe(
        tap((categories: Category[]) => {
          this._categories = categories;
          console.log(this._categories);
          this.uiService.loading.next(false);
        })
      )
      .subscribe();
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
