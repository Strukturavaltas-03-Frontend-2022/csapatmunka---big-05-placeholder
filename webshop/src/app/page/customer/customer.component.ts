import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, combineLatestWith, map, Observable, Subject } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { UiService } from 'src/app/service/common/ui.service';
import { TableService, ITableColumn } from 'src/app/service/tableConfig/table.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  customerService: CustomerService = inject(CustomerService)

  addressService: AddressService = inject(AddressService)

  configTable: TableService = inject(TableService)

  toastr: ToastrService = inject(ToastrService)

  uiService: UiService = inject(UiService)

  customerList$: Observable<Customer[]> = this.customerService.customerList$

  addressList$: Observable<Address[]> = this.addressService.addressList$

  finalList$: Observable<any> = new Observable()

  tableColumns: ITableColumn[] = this.configTable.customerTableColumns

  sortKey: string = ''

  sortDirection: number = 1

  p: number = 1;

  getMergedData(): void {
    this.finalList$ = this.customerList$.pipe(combineLatestWith(this.addressList$),
      map(([customer, address]) => customer.map(customer => {
        customer.address = address.find(a => a.customerID === customer.id)
      })))

  }

  /* getMergedData():void{
    this.finalList$ = combineLatest({
      customer: this.customerList$,
      address: this.addressList$
    }).pipe(
      map( result => result.customer.map( customer =>{
        customer.address = result.address.find(a => a.customerID === customer.id)
        return customer
      }))
    )
  }
   */

  constructor() {
    this.getMergedData()

  }

  startSort(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection *= -1
    } else {
      this.sortDirection = 1
    }
    this.sortKey = key
  }

  showSuccess() {
    this.toastr.success('Általad kiválasztott elem sikeresen törölve lett az adatbázisból!', 'Törölve!');
  }

  onDelete(id: number): void {
    this.customerService.delete(id)
    this.finalList$.subscribe(list => list)
    this.showSuccess()
  }

}
