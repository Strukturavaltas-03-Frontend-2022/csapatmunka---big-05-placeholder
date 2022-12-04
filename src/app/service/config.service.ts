import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  billTableColumns: ITableColumn[] = [
    {title: 'ID', key: 'id'},
    {title: 'OrderID', key: 'orderId'},
    {title: 'Amount', key: 'amount'},
    {title: 'Status', key: 'status'},
  ];

  constructor() { }
}
