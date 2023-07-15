import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    
    constructor(
    ) { }
    
    toLocalDateTime(date: string){
        const rawDate = new Date(date);
        const stringDate = rawDate.toLocaleDateString('en-US',
        { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        return stringDate;
    }
    
    thousandSeparate(x: any) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
        return x;
    }
    
    phoneNumerValidate(phoneNumber: string): boolean {
        const expression = /(^([+]{1}[8]{2}|88)?(01){1}[3-9]{1}\d{8})$/;
        const isMatch = phoneNumber.match(expression);
        if (isMatch == null) return false;
        return true;
    }

}
  