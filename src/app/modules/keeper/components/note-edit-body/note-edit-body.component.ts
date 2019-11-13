import { Component, OnInit, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { Note } from '../../../../models/note-model';
import { NoteLabelsComponent } from '../note-labels/note-labels.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-edit-body',
  templateUrl: './note-edit-body.component.html',
  styleUrls: ['./note-edit-body.component.css']
})
export class NoteEditBodyComponent implements OnInit {
  @Input() note: Note;
  @Input() fileProgress: boolean;
  showProgres:false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getActiveLabels(){
    return this.note.labels;
  }

  //Toggle pin button
  changePin(){
    if(this.note.pin!=null&&this.note.pin!=undefined){
      this.note.pin=!this.note.pin;
    }
  }

  deleteImage(){
    this.note.imagePreview = "";
    this.snackBar.open('Изображение удалено', null, {duration: 2000});
  }


}
