import { Component } from '@angular/core';
import * as uuid from 'uuid';

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
  addTodo(input: HTMLInputElement) {
    const newTodo = new Todo(input.value);
    this.todos = [...this.todos, newTodo];
    input.value = '';
  }
  toggleCompletion(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      Object.assign({}, todo, {completed: !todo.completed}),
      ...this.todos.slice(index + 1)
    ];
  }
  removeTodo(todoId: string) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }
}
