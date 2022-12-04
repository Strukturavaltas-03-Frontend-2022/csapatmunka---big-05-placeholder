import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { FormField, TableService } from 'src/app/service/tableConfig/table.service';



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  actRoute: ActivatedRoute = inject(ActivatedRoute)

  customerService: CustomerService = inject(CustomerService)

  addressService: AddressService = inject(AddressService)

  tableService: TableService = inject(TableService)

  selectedCustomer$ = this.customerService.selectedCustomer$

  selectedAddress$ = this.addressService.selectedAddress$

  addressList$ = this.addressService.addressList$

countries = require('/node_modules/country-json/src/country-by-name.json')

  ngOnInit():void{
    console.log(this.countries);


    this.customerService.getAll()

    this.actRoute.params.subscribe(
      params => {
        this.customerService.get(params['id'])
        this.addressService.get(params['customerID'])
      }
      )
  }

  onSaveCustomer(customer: Customer){
    this.customerService.update(customer)
  }

  onSaveAddress(address: Address){
    this.addressService.update(address)
  }
}
