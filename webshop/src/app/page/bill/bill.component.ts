import { Component, inject } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable } from 'rxjs';
import { Bill } from 'src/app/common/model/bill';
import { BillService } from 'src/app/service/backend/bill.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { OrderService } from 'src/app/service/backend/order.service';
import { ProductService } from 'src/app/service/backend/product.service';
import { ITableColumn, TableService } from 'src/app/service/tableConfig/table.service';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {


  billService: BillService = inject (BillService);
  orderService: OrderService = inject(OrderService);
  productService: ProductService = inject(ProductService);
  customerService: CustomerService = inject(CustomerService);
  config: TableService = inject(TableService);
  toastrService: ToastrService = inject(ToastrService);


  //cols = this.config.billTableColumns;
  columns: ITableColumn[] = this.config.billTableColumns;

  billList$: Observable<Bill[]> = this.billService.getAll();

  sortKey: string = '';
  sortDirection: number =1;

  startSort(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection *= -1
    } else {
      this.sortDirection = 1
    }

    this.sortKey = key
  }

  onDelete(bill: Bill): void {
    this.billService.delete(bill).subscribe(
      drug => this.billList$ = this.billService.getAll(),
    );
  }
  showSuccess() {
    this.toastrService.info('Are you sure?', 'Edit', {
      timeOut: 3000,
    });
  }
}


