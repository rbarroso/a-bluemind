import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<any>, property: string, conditions: {[field: string]: any}): Array<any> {

    if (items) {
      return items.filter(item => {
        for (let field in conditions) {
          if (this.resolve(item, property) !== conditions[field]) {
            return false;
          }
        }
        return true;
      });
    } else {
      return null;
    }
  }

  resolve(obj: any, path: string): any {
    let pathArray: string[] = path.split('.');
    let current: any = obj;
    while (pathArray.length) {
      if(typeof current !== 'object') return undefined;
      current = current[pathArray.shift()];
    }
    return current;
  }

}
