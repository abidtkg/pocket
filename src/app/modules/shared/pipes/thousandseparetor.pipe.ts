import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparetor'
})
export class thousandSeparetor implements PipeTransform {

  transform(value: number, ...args: any[]) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}