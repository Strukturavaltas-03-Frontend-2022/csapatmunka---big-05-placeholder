import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { count, of } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { FormField, TableService } from 'src/app/service/tableConfig/table.service';
import countries from 'src/assets/db/countries.min.json'



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  actRoute: ActivatedRoute = inject(ActivatedRoute)

  customerService: CustomerService = inject(CustomerService)

  addressService: AddressService = inject(AddressService)

  toastr: ToastrService = inject(ToastrService)

  tableService: TableService = inject(TableService)

  selectedCustomer$ = this.customerService.selectedCustomer$

  selectedAddress$ = this.addressService.selectedAddress$

  addressList$ = this.addressService.addressList$

  selectedCountry = new FormControl('')

  cities: String[] = []

//countries = require('/node_modules/country-json/src/country-by-name.json')
  countries = countries





  ngOnInit():void{

    this.actRoute.params.subscribe(
      params => {
        if(params['id'] === '0'){
          of(new Address(), new Customer())
        }else{
          this.customerService.get(params['id'])
          this.addressService.get(params['customerID'])
        }
      }
      )

      this.selectedCountry.valueChanges.subscribe(
        value=>{
          if(value!== null){
            this.cities = countries[value as keyof typeof countries]
          }
        })
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  onSaveCustomer(customer: Customer){
    this.showSuccess()
    this.customerService.update(customer)
  }

  onSaveAddress(address: Address){
    this.showSuccess()
    this.addressService.update(address)
  }

}
