import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, Subscription, tap } from 'rxjs';
import { priceMask } from 'src/app/common/masks';
import { DataObject } from 'src/app/common/model/data-object.interface';
import { Product } from 'src/app/common/model/product.model';
import { CategoryService } from 'src/app/service/backend/category.service';
import { ProductHandlerService } from 'src/app/service/product-handler.service';
import { TableService, ITableColumn } from 'src/app/service/tableConfig/table.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products = new BehaviorSubject<Product[]>([]);
  public categories = this.categorySvc.categories;
  public sortKey = '';
  public sortDirection = 1;
  public tableColumns: ITableColumn[] = this.tableSvc.productTableColumns;
  public pageSize: number = 50;
  public p: number = 1;
  public productFilter = new FormControl(false);
  public showFilter = new BehaviorSubject<boolean>(false);
  public productListForm: FormGroup;
  public priceMask = priceMask;
  public compareFns = {
    catID: (a: Product, b: Product) => {

    }
  }

  private productsMappingSubsription: Subscription;
  private showFilterSubscription: Subscription | undefined;

  constructor(
    private productHandlerSvc: ProductHandlerService,
    private categorySvc: CategoryService,
    private tableSvc: TableService,
    private fb: FormBuilder,
  ) {
    this.productHandlerSvc.getProducts();
    this.productsMappingSubsription =
      combineLatest([this.productHandlerSvc.filteredProducts, this.categorySvc.categories])
        .pipe(
          tap(([products, categories]) => {
            this.products.next(
              products.map(product => {
                return { ...product, category: categories[product.catID - 1].name }
              })
            );
          })
        ).subscribe();
    this.productListForm = this.fb.group({
      name: [undefined, [Validators.minLength]],
      type: [undefined, [Validators.minLength]],
      catID: [''],
      description: [undefined, [Validators.minLength]],
      priceFrom: [undefined],
      priceTo: [undefined],
      featured: [false],
      active: [false],
    });
  }

  ngOnInit() {
    this.showFilterSubscription = this.showFilter.subscribe(
      showFilter => {
        if(!showFilter) {
          this.productHandlerSvc.filterProducts({});
          this.productListForm.reset();
        }
      }
    );
  }

  ngOnDestroy() {
    this.productsMappingSubsription?.unsubscribe();
    this.showFilterSubscription?.unsubscribe();
  }

  startSort(key: string) {
    if(key === this.sortKey) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }
    this.sortKey = key;
  }

  onDelete(productId: number) {
    this.productHandlerSvc.removeProduct(productId);
  }

  switchFilter(event: boolean) {
    this.showFilter.next(event);
  }

 filterProducts() {
    const formEntries = this.productListForm.value;
    let modifiedFormEntries: DataObject = {};
    Object.keys(formEntries).forEach(formItemName => {
      const formEntry = formEntries[formItemName];
      if(formEntry) {
        if(formItemName === 'catID') {
          modifiedFormEntries[formItemName] = Number(formEntry);
        } else {
          modifiedFormEntries[formItemName] = formEntry;
        }
      }
    });

    this.productHandlerSvc.filterProducts(modifiedFormEntries);
  }
}
