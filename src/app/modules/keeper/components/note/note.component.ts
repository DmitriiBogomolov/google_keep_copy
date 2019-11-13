import { Component, OnInit, Input, DoCheck, ViewChild, KeyValueChanges,
         KeyValueDiffer, KeyValueDiffers, IterableDiffers, Output,
         EventEmitter } from '@angular/core';

import { NoteService } from '../../../shared/services/note.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';
import { NoteMenuComponent } from '../note-menu/note-menu.component';
import { Note } from '../../../../models/note-model';
import { Todo } from '../../../../models/todo-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})



export class NoteComponent implements OnInit, DoCheck {
  @Input() note: Note;
  menuActiveTrigger:boolean = false;
  fileProgress:boolean = false;

  cursorX:number;
  cursorY:number;

  private noteDiffer: KeyValueDiffer<string, any>;
  private todoDiffer: KeyValueDiffer<string, any>;
  private iterableDiffer:any;
  private todoIterableDiffer: any;

  constructor(private noteService: NoteService,
              private differs: KeyValueDiffers,
              private _iterableDiffers: IterableDiffers,
              public dialog: MatDialog) { }


  ngOnInit() {
    // Change detectors
    this.noteDiffer = this.differs.find(this.note).create();
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    this.todoIterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngDoCheck(){
    // Detect note changes for outputing
    let changes = this.noteDiffer.diff(this.note); // Note object
    if (changes) {
      this.noteChanged(changes);
    }

    changes = this.iterableDiffer.diff(this.note.labels); // Iterable labels
      if (changes) {
        this.noteChanged(changes);
      }

    changes = this.todoIterableDiffer.diff(this.note.todoList); // Iterable todoList
      if (changes) {
        this.noteChanged(changes);
      }


  }

  // Change detection handler
  noteChanged(changes: KeyValueChanges<string, any>) {
      this.noteChangeEmit(this.note.id);
    }

  // Outputing change detection
  @Output() onChanged = new EventEmitter<string>();
  noteChangeEmit(id:string) {
        this.onChanged.emit(id);
  }

  //Static click logic
  mouseDown($event){
    this.cursorX=$event.clientX;
    this.cursorY=$event.clientY;
  }

  // Generate output static click event
  @Output() staticClick = new EventEmitter<Note>();
  mouseUp($event){
    let distanceX = Math.abs(this.cursorX-$event.clientX);
    let distanceY = Math.abs(this.cursorY-$event.clientY);
    if (distanceX<8 && distanceY<8 ){

      if(   !$event.target.classList.contains('mat-checkbox-inner-container') &&
            !$event.target.closest('.cardFooter') &&
            !$event.target.closest('.noticeBtn') &&
            !$event.target.closest('.cheapWrap')){

        this.staticClick.emit(this.note);
      }

    }
  }

  // Input file loading event handler, shows progress bar
  setFileProgress(fileProgress:boolean){
    this.fileProgress = fileProgress;
  }

  // Check note is empty
  isEmpyNote():boolean{
    return this.noteService.checkNoteIsEmpty(this.note);
  }

  // Toggle todo list item
  checkItem(todo:Todo){
    todo.checked = !todo.checked;
  }

  // Toggle pin button
  @ViewChild('noticeBtn') noticeBtn;
  changePin(){
    if(this.note.pin!=null&&this.note.pin!=undefined){
      this.note.pin=!this.note.pin;
    }
  }

  // Toggle note sebmenu
  setMenuStatus(status:boolean){
    this.menuActiveTrigger=status;
  }

  // Open modal note edit
  openDialog(note: any): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      width: '600px',
      data:note
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!note.todoList.length) this.note.showTodo = false;
    });
  }

}
