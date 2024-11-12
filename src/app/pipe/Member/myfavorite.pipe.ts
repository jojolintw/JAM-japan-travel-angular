import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfavorite'
})
export class MyfavoritePipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0,100)+'...';
  }

}
