import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Todo } from './todo.model';
import { todoReducer, INIT, Action } from './todo.reducer';

const rootReducer = {
  todos: todoReducer
}

@Injectable()
export class StoreService {
  state$: Observable<Todo[]>;
  action$: BehaviorSubject<Action>;

  constructor() {
    this.action$ = new BehaviorSubject<Action>({ type: INIT });
    this.state$ = this.action$
      .scan<Action, Todo[]>((todos, action) => todoReducer(todos, action), []);
  }

  select(): Observable<Todo[]> {
    return this.state$;
  }

  dispatch(action: Action): void {
    this.action$.next(action);
  }
}