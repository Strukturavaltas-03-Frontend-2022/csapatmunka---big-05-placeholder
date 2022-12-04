import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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

@NgModule({
  declarations: [
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
