import { Injectable } from '@angular/core';

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface App {
  todos: Todo[]; 
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_COMPLETION = 'TOGGLE_COMPLETION';

function todoReducer(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
    case REMOVE_TODO:
    case TOGGLE_COMPLETION:
    default:
      return state;
  }
}


@Injectable()
export class Store {

}