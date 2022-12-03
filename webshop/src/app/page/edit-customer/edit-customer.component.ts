import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  ngOnInit():void{

    this.customerService.getAll()

    this.actRoute.params.subscribe(
      params => {
        this.customerService.get(params['id'])
        this.addressService.get(params['customerID'])
      }
      )
      }
}
