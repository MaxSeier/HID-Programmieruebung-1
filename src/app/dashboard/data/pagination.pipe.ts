import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: number): number[] {
    let result = [];
    for (let i = 0; i < value; i++) {
        result.push(i + 1);
        }
    return result;
  }

}
