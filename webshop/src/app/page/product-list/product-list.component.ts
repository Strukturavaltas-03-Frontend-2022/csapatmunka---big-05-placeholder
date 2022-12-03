import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/common/model/product.model';
import { CategoryService } from 'src/app/service/backend/category.service';
import { ProductHandlerService } from 'src/app/service/product-handler.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Observable<Product[]>;
  categories = this.categorySvc.categories.pipe(
    map(cats => cats.map(cat => cat.name))
  );

  constructor(
    private productHandlerSvc: ProductHandlerService,
    private categorySvc: CategoryService,
  ) {
    this.productHandlerSvc.getProducts();
    this.products = this.productHandlerSvc.products;
  }
}
