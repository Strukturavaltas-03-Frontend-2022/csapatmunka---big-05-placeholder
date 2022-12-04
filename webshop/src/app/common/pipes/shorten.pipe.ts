import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    if(!value || value.length < 128) {
      return value;
    }

    return `${value.substring(0, 128)}...`
  }
}
