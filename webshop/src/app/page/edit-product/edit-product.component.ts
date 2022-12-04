import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as IMask from 'imask';
import { omit } from 'lodash-es';
import { map } from 'rxjs';
import { CategoryService } from 'src/app/service/backend/category.service';
import { UiService } from 'src/app/service/common/ui.service';
import { ProductHandlerService } from 'src/app/service/product-handler.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  public productEditorForm: FormGroup;
  public categories = this.categorySvc.categories.pipe(
    map(cats => cats.map(cat => cat.name))
  );
  public priceMask = {
    mask: IMask.MaskedRange,
    from: 1,
    to: 999999,
  };
  private productId: number;

  constructor(
    private productHandlerSvc: ProductHandlerService,
    private categorySvc: CategoryService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.productEditorForm = this.fb.group({
      name: [undefined, [Validators.required, Validators.minLength]],
      type: [undefined, [Validators.required, Validators.minLength]],
      category: ['', [Validators.required]],
      description: [undefined, [Validators.required, Validators.minLength]],
      price: [undefined, [Validators.required]],
      featured: [false],
      active: [false],
    });
    this.productId = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngAfterViewInit() {
    this.uiService.loading.next(true);
    this.productHandlerSvc.getProductById(this.productId).subscribe((product) => {
      if(this.productId) {
        const categories = this.categories
        const modifiedProduct = {
          ...product,
          category: this.categorySvc.categoryList[product.catID - 1].name,
          price: product.price.toString(),
        };
        this.productEditorForm.patchValue(modifiedProduct);
      }
      this.uiService.loading.next(false);
    });
  }

  save() {
    let modifiedProduct = this.productEditorForm.value;
    let categoryId = this.categorySvc.categoryList.find(cat => cat.name === modifiedProduct.category)?.id;

    modifiedProduct = {
      ...omit(modifiedProduct, 'category'),
      catID: categoryId,
      price: Number(modifiedProduct.price),
    };

    if(this.productId) {
      modifiedProduct = {
        ...modifiedProduct,
        id: this.productId
      };
      this.productHandlerSvc.modifyProduct(modifiedProduct);
    } else {
      this.productHandlerSvc.createProduct(modifiedProduct);
    }
  }
}

