import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map } from 'rxjs';
import { Order } from 'src/app/common/model/order';
import { CategoryService } from 'src/app/service/backend/category.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { OrderService } from 'src/app/service/backend/order.service';
import { ProductService } from 'src/app/service/backend/product.service';
import { TableService } from 'src/app/service/tableConfig/table.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderService: OrderService = inject(OrderService);
  productService: ProductService = inject(ProductService);
  customerService: CustomerService = inject(CustomerService);
  config: TableService = inject(TableService);
  toastrService: ToastrService = inject(ToastrService);


  cols = this.config.orderTableColumns;

  p: number = 1;

  sortKey = '';
  sortDirection = 1;

  filterPhrase: string = '';

  constructor(

    private router: Router,

  ) { }
  list$ = combineLatest({
    prod: this.productService.getAll(),
    //cust: this.customerService.getAll(),
    ord: this.orderService.getAll(),
  }).pipe(
    map((result) =>
      result.ord.map(function (order) {
        order.product = result.prod.find((p) => p.id === order.productID);
        //customer = result.cust.find( c => c.id === order.customerID )
        return order;
      })
    )
  );

  startSort(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }

    this.sortKey = key;
  }

  onUpdate(order: Order): void {
    delete order.product;
  }

  showSuccess() {
    this.toastrService.info('Are you sure?', 'Edit', {
      timeOut: 3000,
    });
  }
  ngOnInit(): void {

  }
  onOrderNew(): void {
  this.router.navigate(['/', 'orders', 'edit', 0]);
}
}

