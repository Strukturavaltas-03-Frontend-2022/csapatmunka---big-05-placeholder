import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../common/model/product.model';
import { ProductService } from './backend/product.service';
import { UiService } from './common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class ProductHandlerService {
  private _products = new BehaviorSubject<Product[]>([]);

  get products() {
    return this._products as Observable<Product[]>;
  }

  constructor(
    private productSvc: ProductService,
    private uiService: UiService,
  ) {}

  getProducts() {
    this.uiService.loading.next(true);
    this.productSvc.getAll()
      .pipe(
        tap((products: Product[]) => {
          this._products.next(products);
          this.uiService.loading.next(false);
        })
      ).subscribe();
  }

  getProductById(productId: number) {
    return this.productSvc.get(productId);
  }

  createProduct(product: Product) {
    this.productSvc.create(product);
  }

  removeProduct(productId: number) {
    this.productSvc.remove(productId);
  }
}
