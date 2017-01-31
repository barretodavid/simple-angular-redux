import * as uuid from 'uuid';

export class Todo {
  id: string = uuid();
  completed = false;
  constructor(public description: string) {}
}
