export class Project {
  id: string;
  redmine_id: number;
  name: string;
  type: string;

  constructor( id: string, redmine_id: number, name: string, type: string) {
    this.id = id;
    this.redmine_id = redmine_id;
    this.name = name;
    this.type = type;
  }

}
