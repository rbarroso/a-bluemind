import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'issuesByProjectName'
})
export class IssuesByProjectNamePipe implements PipeTransform {

  transform(items: Array<any>, projectName: string): Array<any> {
    if (items) {
      return items.filter(item => {
          if (item.project.name == projectName) {
            return true;
          }
          return false;
      });
    } else {
      return null;
    }
  }

}
