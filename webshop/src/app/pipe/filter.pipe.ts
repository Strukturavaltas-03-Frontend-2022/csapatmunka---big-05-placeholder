import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T extends {[x:string]: any}> implements PipeTransform {
    transform(value: T[], phrase: string = '', key: string = ''): T[] {
      if(!Array.isArray(value) || !phrase || !key){
        return value
      }

      phrase = phrase.toLowerCase()

      if(key==='all'){
        return value.filter(item=> Object.values(item).join(' ').toLowerCase().includes(phrase) ||
        Object.values(item['address']).join(' ').toLowerCase().includes(phrase))
      }

      if(key==='address'){
        return value.filter(item=> Object.values(item['address']).join(' ').toLowerCase().includes(phrase) )
      }

      return value.filter(item=> ('' + item[key]).toLowerCase().includes(phrase))

    }

  }
