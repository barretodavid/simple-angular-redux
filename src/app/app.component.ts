import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from './todo.model';
import { StoreService } from './store.service';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './todo.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  todos$: Observable<Todo[]>;

  constructor(private store: StoreService) {
    this.todos$ = store.select();
  }

  addTodo(input: HTMLInputElement) {
    const todo = new Todo(input.value);
    this.store.dispatch({ type: ADD_TODO, payload: todo });
    input.value = '';
  }
  toggleCompletion(todo: Todo) {
    this.store.dispatch({ type: TOGGLE_TODO, payload: todo });

  }
  removeTodo(todoId: string) {
    this.store.dispatch({ type: REMOVE_TODO, payload: todoId });
  }
}
