import { Component, OnInit, Input, Output, AfterViewInit, IterableDiffers,
         AfterViewChecked, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as Muuri from 'muuri';
import { Note } from '../../../../models/note-model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';
import { NoteService } from '../../../shared/services/note.service';

// ---------    Muuri grid-layout component     ------------------   //

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() notes: Note[];
  @Input() dragEnabled: boolean = true;
  @Input() editable: boolean = true;

  cursorX:number;
  cursorY:number;

  grid:Muuri;
  dragEndTrigger:boolean = false;

  iterableDiffer:any;


  constructor(  private _iterableDiffers: IterableDiffers,
                public dialog: MatDialog,
                private noteService:NoteService)
                  {
                    //Create iterable differ instance
                    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
                  }


  ngOnInit() {

  }

  ngAfterViewInit(){
    this.initGrid();
  }

  ngAfterViewChecked() {
    // Tracking noteList lenght for reInit grid Layout
    let changes = this.iterableDiffer.diff(this.notes);
    if (changes) {
      if (this.grid) this.grid.destroy();
      this.initGrid();
      // костыль for refreshing grid layout, will realised with component events
      setTimeout(()=>{
        this.grid.refreshItems();
        this.grid.layout();
      },30);
    }
    // synchronize grid layout metrics if was draggin
    if (this.dragEndTrigger){
      this.grid.synchronize();
      this.grid.refreshItems();
      this.grid.layout();
      this.dragEndTrigger = false;
    }

  }


  //Static click logic
  mouseDown($event){
    this.cursorX=$event.clientX;
    this.cursorY=$event.clientY;
  }

  mouseUp($event){
    let distanceX = Math.abs(this.cursorX-$event.clientX);
    let distanceY = Math.abs(this.cursorY-$event.clientY);
    //If static click
    if (distanceX<8 && distanceY<8 ){
    }
    //Else was draggin, update layout in ngAfterViewChecked();
    else{
      this.dragEndTrigger = true;
    }

  }


  //Input static note click event handler
  staticClick(note:Note){
    if(this.editable){
      this.openDialog(note);
    }
  }


  //Open note edit modal
  openDialog(note: any): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      width: '600px',
      data:note
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!note.todoList.length) note.showTodo = false;
    });
  }


  // Input note change event handler. NoteComponent generate event if changed
  onChanged(id:string){
        if(this.grid){
          // костыль for refreshing grid layout, will realised with component events
          setTimeout( () => {
            this.grid.refreshItems();
            this.grid.layout();
          }, 30);
        }
    }


  // Initialisation Muuri Grid Layout Logic
  @ViewChild('gridLayout') gridElem:ElementRef;
  initGrid(){
      // Muuri option object
      let dragSortOptions = {
      action: 'swap',
      threshold: 50
      };
      // Init Muuri layout
      let grid = new Muuri(this.gridElem.nativeElement, {

        dragEnabled: this.dragEnabled,
        // Draggin etc predicats, look Muuri
        dragStartPredicate: function (item, event) {
          return Muuri.ItemDrag.defaultStartPredicate(item, event);
        },
        dragSortPredicate:{
          threshold: 50,
          action: 'swap'
        }
      });
      // On drag drop note items swap
      /*
      grid.on('dragReleaseEnd', function (item, event) {

        let oldItemPosId = item.getElement().getAttribute('id');
        let newItemPosId = 0;
        let items = item.getElement().parentNode.childNodes;

        for(let i in items) {
          if(items[i] == item.getElement()) newItemPosId = i-1;
        }
        this.changingNotes(oldItemPosId,newItemPosId);

      }.bind(this));
      */

    this.grid = grid;
    this.gridChange(this.grid);
  }

  // Outputing grid layout changing event
  @Output() gridChanged = new EventEmitter<any>();
  gridChange(grid:any) {
        this.gridChanged.emit(grid);
  }

  // Swap notes logic
  changingNotes(oldItemPosId:number,newItemPosId:number){
    let oldNote = this.notes[oldItemPosId];
    let newNote = this.notes[newItemPosId];
    this.noteService.changingNotes(oldNote,newNote);

  }

}
