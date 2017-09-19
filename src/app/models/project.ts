export class Project {
  id: string;
  redime_id: number;
  name: string;
  type: string;

  constructor( id: string, redime_id: number, name: string, type: string) {
    this.id = id;
    this.redime_id = redime_id;
    this.name = name;
    this.type = type;
  }

}
