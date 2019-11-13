import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LabelService } from '../../../shared/services/label.service';
import { Note } from '../../../../models/note-model';
import { DialogueConfirmComponent } from '../../../shared/components/dialogue-confirm/dialogue-confirm.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from '../../../shared/services/note.service';

@Component({
  selector: 'app-note-menu',
  templateUrl: './note-menu.component.html',
  styleUrls: ['./note-menu.component.css']
})
export class NoteMenuComponent implements OnInit {
  @Input() note: Note;
  @Input() details: boolean; // means that menu not in noteComponent
  @Input() newNote: boolean; // means that menu in newPageComponent
  selecetdFile : File;
  menuActive: boolean = false; // means that one of menu item open
  labelList: string[];

  minDate: Date = new Date();
  maxDate: Date = new Date(2030, 0, 1);

  colors:string[] = [     // Available menu colors
    '#fefefe',
    '#f28c80',
    '#f6bf02',
    '#fff478',
    '#cdfe91',
    '#a6fdea',
    '#cdeff8',
    '#afcbfa',
    '#d5affc',
    '#fdcfe9',
    '#e2cba9',
    '#e9eaee'
  ];


  constructor(private noteService: NoteService,
              private labelService: LabelService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.labelList = labelService.getLabels();
  }

  ngOnInit() {

  }

  // Image upload event handler
  onFileUpload(event){

    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();

    // Set uploading start/end handlers
    let setFileProgress = this.setFileProgress.bind(this);
    reader.onloadstart = (function(){
      setFileProgress(true);
    });
    reader.onloadend = (function(){
      // Load emulation
      setTimeout( () => {
        setFileProgress(false);
      }, 3000);
    });

    // Set file to note
    reader.onload = () => {
      this.note.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selecetdFile);

  }

  // Outputing file upload start/end event
  @Output() fileProgress = new EventEmitter<boolean>();
  setFileProgress(show:boolean) {
          this.fileProgress.emit(show);
  }

  // Check current color is selected
  isSelect(index:number):boolean{
    return (this.note.selectedColor==index);
  }
  // Color menu item click event handler
  colorClick(index:number){
      this.note.selectedColor=index;
      this.note.color = this.colors[index];
  }

  getColor(index:number):string{
    return this.colors[index];
  }

  // Toggle label menu item checkbox
  changeCheck(index, $event:any){
    let labelIndexOf = this.note.labels.indexOf(this.labelList[index]);
    if (labelIndexOf != -1){
      this.note.labels.splice(labelIndexOf, 1);
    }
    else this.note.labels.push(this.labelList[index]);
  }

  // Check current label menu item is active
  labelChecked(index):boolean{
    if (this.note.labels.indexOf(this.labelList[index]) != -1) return true;
    else return false;
  }

  // Set selected time to date
  updateTime(time){
    if((this.note.date!=undefined)&&(this.note.date!=null)){
      if (!time)  time = '00:00';

      let timeArray = time.split(':');
      this.note.date = new Date(this.note.date.getFullYear(),
                                this.note.date.getMonth(),
                                this.note.date.getDate(),
                                timeArray[0], timeArray[1], 0);
    }
  }

  // Delete or restore note
  deleteConfirmDialogue(): void {
    if(this.newNote){
      this.deleteNote();
      this.snackBar.open('Заметка перемещена в корзину', null, {duration: 2000});
    }
    else if(!this.note.trash){
      const dialogRef = this.dialog.open(DialogueConfirmComponent, {
        width: '250px',
        data: 'Удалить заметку?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.deleteNote();
          this.snackBar.open('Заметка перемещена в корзину', null, {duration: 2000});
        }
      });
    }
    else {
      this.deleteNote();
      this.snackBar.open('Заметка восстановлена', null, {duration: 2000});
    }
    this.deleteNoteEmit();
  }

  deleteNote(){
    this.note.arhieved = false;
    this.note.trash = !this.note.trash;
  }

  @Output() noteDelete = new EventEmitter<boolean>();
  deleteNoteEmit(){
    this.noteDelete.emit(true);
  }


  // Arhive the note
  arhiveClick(){
    this.note.trash = false;
    this.note.arhieved = !this.note.arhieved;
    if (this.note.arhieved) this.snackBar.open('Заметка перемещена в архив', null, {duration: 2000});
    else this.snackBar.open('Заметка восстановлена из архива', null, {duration: 2000});
    this.archiveNoteEmit();
  }

  @Output() noteArhive = new EventEmitter<boolean>();
   archiveNoteEmit(){
     this.noteArhive.emit(true);
   }

  // Showed note edit todo list
  showTodoList(){
    if(this.details){
      this.note.showTodo = true;
      this.showTodo();
    }
    else{
      this.note.showTodo = !this.note.showTodo;
    }

  }

  // Outputing todoList menu click
  @Output() showNote = new EventEmitter<boolean>()
  showTodo() {
        this.showNote.emit(true);
    }


  // Outputing menu opened trigger
  @Output() setMenu = new EventEmitter<boolean>();
  setMenuStatus(status:boolean) {
    this.setMenu.emit(status);
  }

  // Fix closing autocomplete by clicking outside
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @ViewChild("auto") myautocomplete;
  hideAutoComplete(event){
      if((this.myautocomplete.isOpen)&&(!event.target.closest('.timeField'))){
        this.autocomplete.closePanel();
      }
  }

  // Closes menu on close click
  @ViewChild('alarmMenuTrigger') alarmMenuTrigger : MatMenuTrigger;
  @ViewChild('labelMenuTrigger') labelMenuTrigger : MatMenuTrigger;
  closeMyMenu(){
    this.alarmMenuTrigger.closeMenu();
    this.labelMenuTrigger.closeMenu();
  }

  //
  showMoreMenuItem(){
    if ( this.newNote && this.noteService.checkNoteIsEmpty(this.note) ) return false;
    else return true;
  }


}
