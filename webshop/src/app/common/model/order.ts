import { Product } from "./product.model";
//import { Customer } from "./customer.model";

export class Order {
  [x: string]: any;
  id: number = 0;
  //customer?: Customer = new Customer();
  customerID: number = 0;
  product?: Product = new Product();
  productID: number = 0;
  amount: number = 0;
  status: string = "new";
}
