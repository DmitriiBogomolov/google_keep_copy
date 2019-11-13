import { Component, OnInit, ElementRef, HostListener, Input, AfterViewChecked } from '@angular/core';
import { NoteService } from '../../../shared/services/note.service';
import { NoteMenuComponent } from '../note-menu/note-menu.component';
import { NoteEditBodyComponent } from '../note-edit-body/note-edit-body.component';
import { Note } from '../../../../models/note-model';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit, AfterViewChecked {
  @Input() defaultAlarm: Date;
  @Input() defaultLabel: string;
  openTrigger:boolean = false;
  newNote:Note;
  routeChanged:boolean = false;
  fileProgress:boolean = false;
  cursorX:number;
  cursorY:number;

  constructor(
            private eRef: ElementRef,
            private noteService: NoteService,
            public router: Router) {


    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
      }
      if(event instanceof NavigationEnd){
        this.routeChanged = true;
      }
    });

   }


  ngOnInit() {
    this.newNote = this.generateEmptyNote();
  }

  // Generate empty note after changin main menu label
  ngAfterViewChecked(){
    if(this.routeChanged){
      this.newNote = this.generateEmptyNote();
      this.routeChanged = false;
    }
  }

  // Static click event calls toggleNewNote component logic
  @HostListener('document:mousedown', ['$event'])
  mouseup(event){
    this.cursorX=event.clientX;
    this.cursorY=event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  mousedown(event){
    let distanceX = Math.abs(this.cursorX-event.clientX);
    let distanceY = Math.abs(this.cursorY-event.clientY);
    if (distanceX<8 && distanceY<8 ) this.toggleNewNote(event);
  }

  // newNote element close/open logic
  toggleNewNote(event) {
    // If click inside element
    if(event.target.closest('.newNote') || event.target.classList.contains('clearBtn') || event.target.closest('.image-preview')) {

      if(event.target.className=="closeBtn"){
        this.closePanel();
      }

      else{
        this.openPanel();
      }

    // Else click outside
    } else {
      // Fix clicking in angular material overlays
      if( !event.target.closest(".cdk-overlay-container") && !event.target.closest(".mat-autocomplete-panel") ){
          this.closePanel()
      }
    }
  }

  closePanel(){
    if(!this.isNoteEmpty(this.newNote)){
      this.addNote();
      this.clear();
    }
    this.openTrigger=false;
  }

  openPanel(){
    this.openTrigger=true;
  }

  isNoteEmpty(newNote:Note){
    return this.noteService.checkNoteIsEmpty(newNote);
  }

  addNote(){
    this.noteService.addNote(this.newNote);
  }

  clear(){
    this.newNote = this.generateEmptyNote();
  }

  // Generate empty note with default label/alarm after main menu label changin
  generateEmptyNote():Note{
    let newNote = this.noteService.getEmptyNote();
    if(this.defaultLabel) newNote.labels.push(this.defaultLabel);
    if(this.defaultAlarm) newNote.date = this.defaultAlarm;
    return newNote;
  }

  // Input file loading event handler, shows progress bar
  setFileProgress(fileProgress:boolean){
    this.fileProgress = fileProgress;
  }

  // Delete/arhive note event handlers
  noteDeleted($event){
    this.closePanel();
  }
  noteArhived($event){
    this.closePanel();
  }


}
