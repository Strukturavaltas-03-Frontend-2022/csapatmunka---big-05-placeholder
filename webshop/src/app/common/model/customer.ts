import { Address } from "./address";

export class Customer {
  [x: string]: any;
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address?: Address = new Address();
  active: boolean = true;
}
