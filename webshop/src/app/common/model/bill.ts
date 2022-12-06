export class Bill {
  [x: string]: any;
  id: number = 0;
  orderID: number =1;
  amount: number = 0;
  status: 'new' | 'paid' = 'new';
}
