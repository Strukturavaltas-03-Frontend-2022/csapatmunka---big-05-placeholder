import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './page/customer/customer.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { HomeComponent } from './page/home/home.component';
import { OrderComponent } from './page/order/order.component';
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
    path: 'orders',
    component: OrderComponent,
  },
  {
    path: 'orders/edit/:id',
    component: EditOrderComponent
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
