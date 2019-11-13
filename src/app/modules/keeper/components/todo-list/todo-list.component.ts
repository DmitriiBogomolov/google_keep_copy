import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../../../../models/todo-model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() note;
  constructor() { }

  ngOnInit() {

  }

  // TodoItem input event handler, push new todoItem
  @ViewChild('todoItemWrap') todoWrap: ElementRef;
  todoPush(input:HTMLInputElement){
    input.blur();
    this.note.todoList.push({value:input.value, checked:false});
    input.value = "";
    // Костылем change focus to created element
    setTimeout( () => {
      this.todoWrap.nativeElement.lastChild.querySelector('.todoInput').focus();
      console.log('newItem');
    },10);

  }

  // TodoItem enterPress event handler, insert new todoItem
  pressInput(element, index:number){
    let emptyElem = {value:element.value, checked:false};
    this.note.todoList.splice(index+1, 0, emptyElem)
    // Костылем change focus to created element
    setTimeout( () => {
      element._elementRef.nativeElement.nextSibling.querySelector('.todoInput').focus();
    },10);
  }

  removeItem(i:number){
    this.note.todoList.splice(i,1);
  }

  // Set todoItem HTMLelement active
  setClass(element){
    if(element._elementRef){
      element._elementRef.nativeElement.classList.add('itemActive');
    }
    else element.classList.add('itemActive');
  }

  // Set todoItem HTMLelement disabled
  removeClass(element){
    if(element._elementRef){
      element._elementRef.nativeElement.classList.remove('itemActive');
    }
    else element.classList.remove('itemActive');
  }

  // Toggle todoItem checkbox
  checkItem(listItem:Todo){
    listItem.checked = !listItem.checked;
  }

}
