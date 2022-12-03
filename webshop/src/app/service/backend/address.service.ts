import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { Customer } from 'src/app/common/model/customer';
import { environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiURL: string = environment.apiURL

  entityName: string = environment.entity.address

  addressList$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([])

  selectedAddress$: BehaviorSubject<Address> = new BehaviorSubject<Address>(new Address())

  http: HttpClient = inject(HttpClient)

  constructor() {
    this.getAll()
   }

  getCachedItemIndexById(id: number): number{
    id = Number(id);
    const currentList = this.addressList$.getValue();
    return currentList.findIndex(item => item['customerID'] === id)
  }

  getAll():void{
    this.http.get<Address[]>(`${this.apiURL}${this.entityName}`).subscribe({
      next: addressList => this.addressList$.next(addressList)
    })
  }

  get(id: number): void{
    const itemIndex = this.getCachedItemIndexById(id)
      if(itemIndex > -1){
        this.selectedAddress$.next(this.addressList$.getValue()[itemIndex])
        }else{
          this.http.get<Address>(`${this.apiURL}${this.entityName}/${id}`).subscribe({
            next: address => this.selectedAddress$.next(address)
          })
        }
  }

  update(address: Address):void {
    this.http.patch<Address>(`${this.apiURL}${this.entityName}/${address.customerID}`, address).subscribe({
      next: address => {
        const itemIndex = this.getCachedItemIndexById(address.customerID)
        if( itemIndex > -1){
          this.addressList$.getValue().splice(itemIndex, 0, address)
        }
      }
    })
  }

  delete(id: number):void{
    this.http.delete<Address>(`${this.apiURL}${this.entityName}/${id}`).subscribe({
      next: () => {
        const itemIndex = this.getCachedItemIndexById(id)
        if(itemIndex > -1){
          this.addressList$.getValue().splice(itemIndex,1)
        }
      }
    })
  }

  add(address: Address): void{
    this.http.post<Address[]>(`${this.apiURL}${this.entityName}`,address).subscribe({
      next: (addressList) => this.addressList$.getValue().push(address)
    })
  }



}
