import { Todo } from './todo-model';

export class Note{
  id:string;
  title?:string;
  description?:string;
  pin?:boolean;
  labels?:string[];
  date?:Date;
  time?:string;
  selectedColor?:number;
  color?:string;
  imagePreview?:string;
  todoList?:Todo[];
  showTodo?:boolean;
  arhieved?:boolean;
  trash?:boolean;
}
