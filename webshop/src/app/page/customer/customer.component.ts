import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, combineLatestWith, map, Observable, Subject } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { UiService } from 'src/app/service/common/ui.service';
import { TableService, ITableColumn, CustomerFilter } from 'src/app/service/tableConfig/table.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerService: CustomerService = inject(CustomerService)

  addressService: AddressService = inject(AddressService)

  configTable: TableService = inject(TableService)

  toastr: ToastrService = inject(ToastrService)

  uiService: UiService = inject(UiService)

  customerList$: Observable<Customer[]> = this.customerService.customerList$

  addressList$: Observable<Address[]> = this.addressService.addressList$

  tableColumns: ITableColumn[] = this.configTable.customerTableColumns

  sortKey: string = ''

  sortDirection: number = 1

  p: number = 1;

  filterable: boolean = false

  selectedOption = new FormControl('')

  selectedFilter: string = ''

  searchPhrase: string = ''

  options: CustomerFilter[] = this.configTable.customerFilterEditorFields

/*   list = combineLatest({
    customer: this.customerList$,
    address: this.addressList$
  }).pipe(
    map(result=> result.customer.map(customer=>{
      customer.address = result.address.find(a=> a.id=== customer.id)
      return customer
    }))
  ) */

    ngOnInit():void{
      this.customerList$.pipe(combineLatestWith(this.addressList$),
      map(([customer, address]) => customer.map(customer => {
        customer.address = address.find(a => a.id === customer.id)
      }))).subscribe()
    }


  constructor() {
    this.selectedOption.valueChanges.subscribe(value=> this.selectedFilter=String(value)
    )
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
    this.addressService.delete(id)
    this.showSuccess()
  }

}
