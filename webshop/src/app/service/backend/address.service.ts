import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Address } from 'src/app/common/model/address';
import { environment } from 'src/environments/environment';


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
    return currentList.findIndex(item => item['id'] === id)
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
            next: address =>this.selectedAddress$.next(address)
          })
        }
  }
/*
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

  } */

  update(address: Address):void {
    this.http.patch<Address>(`${this.apiURL}${this.entityName}/${address.id }`, address).subscribe({
      next: () => {
        this.getAll()
      }
    /*   next: address => {
        const itemIndex = this.getCachedItemIndexById(address.id )
        if( itemIndex > -1){
          this.addressList$.getValue().splice(itemIndex, 0, address)
        }
      } */
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
/*       next: () => {
        this.getAll()
      } */
   /*    next: (addressList) => this.addressList$.getValue().push(address) */
    })
  }

}
