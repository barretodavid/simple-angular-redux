import { Todo } from './todo.model';

export interface Action {
  type: string;
  payload?: string | Todo;
}

export const INIT = 'INIT';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_COMPLETION';

export function todoReducer(todos: Todo[] = [], action: Action): Todo[] {

  let todo: Todo;
  let todoId: string;

  switch(action.type) {

    case ADD_TODO:
      todo = <Todo>action.payload;
      return [...todos, todo];
    
    case REMOVE_TODO:
      todoId = <string>action.payload;
      return todos.filter(todo => todo.id !== todoId);
    
    case TOGGLE_TODO:
      todo = <Todo>action.payload;
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
