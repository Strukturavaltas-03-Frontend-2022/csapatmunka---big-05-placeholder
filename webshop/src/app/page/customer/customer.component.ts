import { Component, inject } from '@angular/core';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { CustomerTableService, ITableColumn } from 'src/app/service/tableConfig/customer-table.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  customerService: CustomerService = inject(CustomerService)

  addressService: AddressService = inject(AddressService)

  configTable: CustomerTableService = inject(CustomerTableService)

  customerList$: Observable<Customer[]> = this.customerService.customerList$

  addressList$: Observable<Address[]> = this.addressService.addressList$

  tableColumns: ITableColumn[] =  this.configTable.customerTableColumns

  sortKey: string = ''

  sortDirection: number = 1

  updateUsersTrigget = new Subject<void>()


  finalList$ = combineLatest({
    customer: this.customerList$,
    address: this.addressList$
  }).pipe(
    map( result => result.customer.map( customer =>{
      customer.address = result.address.find(a => a.customerID === customer.id)
      return customer
    }))
  )

  startSort(key:string):void{
    if(key === this.sortKey){
      this.sortDirection *= -1
    }else{
      this.sortDirection = 1
    }
    this.sortKey = key
  }

  onDelete(id:number):void{
    this.customerService.delete(id)
  }

}
