import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/common/model/customer';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { UiService } from '../common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  uiService: UiService = inject(UiService)

  apiURL: string = environment.apiURL

  entityName: string = environment.entity.customer

  customerList$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([])

  selectedCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(new Customer())

  http: HttpClient = inject(HttpClient)

  constructor() {
    this.getAll()
   }

  getCachedItemIndexById(id: number): number{
    id = Number(id);
    const currentList = this.customerList$.getValue();
    return currentList.findIndex(item => item['id'] === id)
  }

  getAll():void {
    this.uiService.loading.next(true);
    this.http.get<Customer[]>(`${this.apiURL}${this.entityName}`).subscribe({
      next: customers=>{
        this.customerList$.next(customers)
        this.uiService.loading.next(false);
      }

    })
  }

  get(id:number):void {
    const itemIndex = this.getCachedItemIndexById(id)

    if(itemIndex > -1){
      this.selectedCustomer$.next(this.customerList$.getValue()[itemIndex])
    }
    else{
      this.http.get<Customer>(`${this.apiURL}${this.entityName}/${id}`).subscribe({
       next: customer => this.selectedCustomer$.next(customer)
    })
    }

  }

  update(customer: Customer):void {
    this.http.patch<Customer>(`${this.apiURL}${this.entityName}/${customer.id}`, customer).subscribe({
      next: () => {
        this.getAll()
      }
/*       next: customer => {
        const itemIndex = this.getCachedItemIndexById(customer.id)
        if( itemIndex > -1){
          this.customerList$.getValue().splice(itemIndex, 0, customer)
        }
      } */
    })
  }

  delete(id: number):void{
    this.http.delete<Customer>(`${this.apiURL}${this.entityName}/${id}`).subscribe({
      next: () => {
        const itemIndex = this.getCachedItemIndexById(id)
        if(itemIndex > -1){
          this.customerList$.getValue().splice(itemIndex,1)
        }
      }
    })
  }

  add(customer: Customer): void{
    this.http.post<Customer[]>(`${this.apiURL}${this.entityName}`,customer).subscribe({
      next: () => {
        this.getAll()
/*     this.customerList$.getValue().push(customer) */
      }

    })
  }


}
