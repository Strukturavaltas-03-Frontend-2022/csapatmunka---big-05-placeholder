import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DataObject } from '../common/model/data-object.interface';
import { Product } from '../common/model/product.model';
import { ProductService } from './backend/product.service';
import { UiService } from './common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class ProductHandlerService {
  private _products = new BehaviorSubject<Product[]>([]);
  private _filteredProducts = new BehaviorSubject<Product[]>([]);

  get products() {
    return this._products as Observable<Product[]>;
  }

  get filteredProducts() {
    return this._filteredProducts as Observable<Product[]>;
  }

  constructor(
    private productSvc: ProductService,
    private uiService: UiService,
    private router: Router,
  ) {}

  getProducts() {
    this.uiService.loading.next(true);
    this.productSvc.getAll()
      .pipe(
        tap((products: Product[]) => {
          this._products.next(products);
          this._filteredProducts.next(products);
          this.uiService.loading.next(false);
        })
      ).subscribe();
  }

  getProductById(productId: number) {
    return this.productSvc.get(productId);
  }

  createProduct(product: Product) {
    this.uiService.loading.next(true);
    this.productSvc.create(product).pipe(
      tap((product) => {
        this.getProducts();
        this.router.navigate(['product-list']);
        this.uiService.loading.next(false);
      }),
    ).subscribe();
  }

  modifyProduct(product: Product) {
    this.uiService.loading.next(true);
    this.productSvc.update(product).pipe(
      tap((product) => {
        this.getProducts();
        this.router.navigate(['product-list']);
        this.uiService.loading.next(false);
      }),
    ).subscribe();
  };

  removeProduct(productId: number) {
    this.uiService.loading.next(true);
    this.productSvc.remove(productId).pipe(
      tap((product) => {
        this.getProducts();
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
        this.uiService.loading.next(false);
      }),
    ).subscribe();
  };

  filterProducts(formEntries: DataObject) {
    this._products.pipe(
      tap((products) => {
        let filteredProducts = products;

        Object.keys(formEntries).forEach(formEntryName => {
          if (typeof formEntries[formEntryName] === 'boolean' || formEntryName === 'catID') {
            filteredProducts = filteredProducts.filter(m => m[formEntryName] === formEntries[formEntryName]);
          } else if (formEntryName === 'priceFrom') {
            filteredProducts = filteredProducts.filter(m => m.price >= Number(formEntries[formEntryName]));
          } else if (formEntryName === 'priceTo') {
            filteredProducts = filteredProducts.filter(m => m.price <= Number(formEntries[formEntryName]));
          } else {
            filteredProducts = filteredProducts.filter(m => m[formEntryName].toLowerCase().includes(formEntries[formEntryName].toLowerCase()));
          }
        });

        this._filteredProducts.next(filteredProducts);
      })
    ).subscribe();
  }
}
