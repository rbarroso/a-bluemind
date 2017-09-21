import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {

    if (items) {
      return items.filter(item => {
        for (let field in conditions) {
          if (item[field] !== conditions[field]) {
            return false;
          }
        }
        return true;
      });
    } else {
      return null;
    }
  }

}
