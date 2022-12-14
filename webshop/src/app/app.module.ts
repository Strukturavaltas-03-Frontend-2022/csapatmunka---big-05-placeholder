import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { OrderComponent } from './page/order/order.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { CustomerComponent } from './page/customer/customer.component';
import { AddressComponent } from './page/address/address.component';
import { ProductSortPipe } from './pipe/product-sort.pipe';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ShortenPipe } from './common/pipes/shorten.pipe';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { ToggleButtonComponent } from './common/toggle-button/toggle-button.component';
import { SumPipe } from './pipe/sum.pipe';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { BillComponent } from './page/bill/bill.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { FilterPipe } from './pipe/filter.pipe';
import { CustomerSumPipe } from './pipe/customer-sum.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    CustomerComponent,
    AddressComponent,
    ProductSortPipe,
    EditCustomerComponent,
    OrderComponent,
    SpinnerComponent,
    ProductListComponent,
    ShortenPipe,
    EditProductComponent,
    ToggleButtonComponent,
    SumPipe,
    EditOrderComponent,
    BillComponent,
    EditBillComponent,
    FilterPipe,
    CustomerSumPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule,
    IMaskModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgApexchartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


