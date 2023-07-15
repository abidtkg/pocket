import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Pipe({
  name: 'timeStampToDate'
})
export class timeStampToDate implements PipeTransform {

  constructor(
    private Helper: HelperService
  ){}

  transform(value: any, ...args: any[]) {
    const dateFormat = new Date(value).toISOString();
    return this.Helper.toLocalDateTime(dateFormat);
  }

}