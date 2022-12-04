import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './page/bill/bill.component';
import { CustomerComponent } from './page/customer/customer.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { HomeComponent } from './page/home/home.component';
import { ProductListComponent } from './page/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: EditProductComponent,
  },
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'customers/edit/:id/:customerID',
    component: EditCustomerComponent
  },
  {
    path: 'bills',
  component: BillComponent,
  },
  {
    path: 'bill/:id',
    component: EditBillComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
