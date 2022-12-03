import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/backend/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  actRoute: ActivatedRoute = inject(ActivatedRoute)

  customerService: CustomerService = inject(CustomerService)

  selectedCustomer$ = this.customerService.selectedCustomer$

  ngOnInit():void{
    this.actRoute.params.subscribe(
      params => this.customerService.get(params['id'])
  )
  }

}
