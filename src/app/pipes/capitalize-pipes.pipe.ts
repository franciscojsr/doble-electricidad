/*
  Pipe para capitalize string 
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizePipes'
})
export class CapitalizePipesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let capitalizeVal = value;
    try{
      capitalizeVal = value.charAt(0).toUpperCase() + value.slice(1);
    } catch(e) {
      // console.log(e);
    }
    return capitalizeVal;
  }  

}
