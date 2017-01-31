import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface Action {
  type: string;
  payload?: string | Todo;
}

export const INIT = 'INIT';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_COMPLETION';

export function todoReducer(todos: Todo[] = [], action: any): Todo[] {

  let todo: Todo;
  let todoId: string;

  switch(action.type) {

    case ADD_TODO:
      todo = action.payload;
      return [...todos, todo];
    
    case REMOVE_TODO:
      todoId = action.payload;
      return todos.filter(todo => todo.id !== todoId);
    
    case TOGGLE_TODO:
      todo = action.payload;
      const index = todos.indexOf(todo);
      return [
        ...todos.slice(0, index),
        Object.assign({}, todo, {completed: !todo.completed}),
        ...todos.slice(index + 1)
      ];
    
    default:
      return todos;
  }
}

@Injectable()
export class StoreService {
  state$: Observable<any>;
  action$: BehaviorSubject<any>;

  constructor() {
    this.action$ = new BehaviorSubject<any>({ type: INIT });
    this.state$ = this.action$
      .scan((todos, action) => todoReducer(todos, action), []);
  }

  select(): Observable<Todo[]> {
    return this.state$;
  }

  dispatch(action: Action): void {
    this.action$.next(action);
  }
}