import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Todo } from './todo.model';
import { todoReducer, INIT, Action } from './todo.reducer';

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