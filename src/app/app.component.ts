import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

import { StoreService, ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './store.service';

class Todo {
  id: string = uuid();
  completed = false;
  constructor(public description: string) {}
}

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

    // const newTodo = new Todo(input.value);
    // this.todos = [...this.todos, newTodo];
    // input.value = '';
  }
  toggleCompletion(todo: Todo) {
    this.store.dispatch({ type: TOGGLE_TODO, payload: todo });


    // const index = this.todos.indexOf(todo);
    // this.todos = [
    //   ...this.todos.slice(0, index),
    //   Object.assign({}, todo, {completed: !todo.completed}),
    //   ...this.todos.slice(index + 1)
    // ];
  }
  removeTodo(todoId: string) {
    this.store.dispatch({ type: REMOVE_TODO, payload: todoId })
    // this.todos = this.todos.filter(todo => todo.id !== todoId)
  }
}
