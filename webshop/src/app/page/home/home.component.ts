import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/backend/bill.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { OrderService } from 'src/app/service/backend/order.service';
import { ProductHandlerService } from 'src/app/service/product-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productsInfo = this.productHandlerSvc.getProductsInfo();
  public customerList$ = this.customerSvc.customerList$;
  public orderList$ = this.orderSvc.getAll();
  public billList$ = this.billSvc.getAll();

  constructor(
    private productHandlerSvc: ProductHandlerService,
    private customerSvc: CustomerService,
    private orderSvc: OrderService,
    private billSvc: BillService) {
    this.productHandlerSvc.getProducts();
  }

  ngOnInit(): void {
  }

}
