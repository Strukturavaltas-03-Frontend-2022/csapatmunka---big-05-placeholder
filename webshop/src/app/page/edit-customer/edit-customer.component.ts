import { outputAst } from '@angular/compiler';
import { Component, inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, combineLatestAll, count, of } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { AddressService } from 'src/app/service/backend/address.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { TableService } from 'src/app/service/tableConfig/table.service';
import countries from 'src/assets/db/countries.min.json'
import { CustomerComponent } from '../customer/customer.component';



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

  router: Router = inject(Router)

  selectedCustomer$ = this.customerService.selectedCustomer$

  selectedAddress$ = this.addressService.selectedAddress$

  selectedCountry = new FormControl('')

  cities: String[] = []

  countries = countries

  ngOnInit():void{

    this.addressService.getAll()

      this.selectedCountry.valueChanges.subscribe(
        value=>{
          if(value!== null){
            this.cities = countries[value as keyof typeof countries]
          }
        })

        this.actRoute.params.subscribe(
          params => {
            if(params['id'] === '0'){
              of(new Address(), new Customer())
              console.log(params);

            }else{
              console.log(params);

              this.addressService.get(params['customerID'])
              this.customerService.get(params['id'])
            }
          }
          )
  }

  showSuccess() {
    this.toastr.success('Adatok mentve!', 'Mentés!');
  }


  onSaveBoth():void{
    this.selectedCustomer$.subscribe(customer=>{
      delete customer.address
      if(customer.id === 0){
        console.log(customer);
        this.customerService.add(customer)
        this.selectedAddress$.subscribe(address=>{
          console.log(address);
          this.addressService.add(address)
        })
      }else{
        this.customerService.update(customer)
        this.selectedAddress$.subscribe(address=>{
          this.addressService.update(address)
        })
      }
    })
    this.showSuccess()
    this.router.navigate(['customers'])
  }

}
