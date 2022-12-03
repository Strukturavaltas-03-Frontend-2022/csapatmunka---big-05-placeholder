import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

export interface ITableColumn {
  title: string;
  key: string;
}

export class FormField{
  label:string = '';
  key: string = '';
  type?: string = 'text';
  required?: boolean = true;
  validators: ValidatorFn[] = []
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  customerTableColumns: ITableColumn[] = [
    {title: 'First name', key: 'firstName'},
    {title: 'Last name', key: 'lastName'},
    {title: 'Email', key: 'email'},
    {title: 'Address', key: 'address'},
    {title: 'Active.', key: 'active'},
    {title: 'ID', key: 'id'},
  ];

  productTableColumns: ITableColumn[] = [
    {title: 'Name', key: 'name'},
    {title: 'Type', key: 'type'},
    {title: 'Category', key: 'category'},
    {title: 'Description', key: 'description'},
    {title: 'Price', key: 'price'},
  ];

  constructor() { }
}
