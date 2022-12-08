import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerSum'
})
export class CustomerSumPipe<T extends {[key:string]:any}> implements PipeTransform {

  transform(value: T[], state: boolean = true): number {
    if(!Array.isArray(value)) return 0

    if(state === false) value.filter(customer=> customer['active'] === state).length

    return value.filter(customer=> customer['active'] === state).length
  }

}
