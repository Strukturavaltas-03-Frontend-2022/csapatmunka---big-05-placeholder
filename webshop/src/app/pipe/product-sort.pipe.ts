import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsort',
})
export class ProductSortPipe<T extends { [key: string]: any }> implements PipeTransform {
  transform(value: T[], key: string, sortDirection: number = 1): T[] {
    if (!Array.isArray(value) || !key) {
      return value;
    }

    return value.sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return (a[key] - b[key]) * sortDirection;
      }

      if (typeof a[key] === 'object' && typeof b[key] === 'object') {
        return (('' + a[key].country).localeCompare('' + b[key].country) * sortDirection);
      }

      if (typeof a[key] === 'boolean' && typeof b[key] === 'boolean') {
        return ('' + a[key]).localeCompare('' + b[key]) * sortDirection;
      }

      return ('' + a[key]).localeCompare('' + b[key]) * sortDirection;
    });
  }
}
