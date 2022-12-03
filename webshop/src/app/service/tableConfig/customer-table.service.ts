import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerTableService {

  customerTableColumns: ITableColumn[] = [
    {title: 'First name', key: 'firstName'},
    {title: 'Last name', key: 'lastName'},
    {title: 'Email', key: 'email'},
    {title: 'Address', key: 'address'},
    {title: 'Active.', key: 'active'},
    {title: 'ID', key: 'id'},
  ]
  constructor() { }
}
