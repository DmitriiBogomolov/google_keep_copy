import { Component, Inject, Input, Output, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import * as $ from 'jquery';

import { NoteService } from '../../../shared/services/note.service';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';
import {MatInputModule} from '@angular/material/input';
import { Note } from '../../../../models/note-model';
import { ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css']
})
export class NotePageComponent implements OnInit {

  notes:Note[];
  dragEnabled:boolean = true;

  labelId: string;
  subscription: Subscription;

  mainGrid: any;
  secondGrid: any;

  constructor(private noteService: NoteService,
              private cdRef:ChangeDetectorRef,
              public dialog: MatDialog,
              private activateRoute: ActivatedRoute,
              public router: Router) {

    this.labelId = activateRoute.params['labelId'];
    this.subscription = activateRoute.params.subscribe(params => this.changeRoute(params['labelId']));
    this.notes = noteService.getValidNotes();
  }

  ngOnInit() {

  }

  // Route changing handler
  changeRoute(params){
    this.labelId=params;
    if(this.labelId) this.dragEnabled = false;
    else this.dragEnabled = true;
  }

  // Gets notes based on label in route
  getNotesByLabel() :Note[] {
    return this.noteService.getNotesByLabel(this.labelId);
  }
  getNoticedByLabel() : Note[]{
    return this.noteService.filerNoticed(this.getNotesByLabel(), true);
  }
  getUnnoticedByLabel() :Note[]{
    return this.noteService.filerNoticed(this.getNotesByLabel(), false);
  }

  // Input grid changing event handlers
  mainGridChanged(grid:any){
    this.mainGrid = grid;
  }
  secondGridChanged(grid:any){
    this.secondGrid = grid;
  }

}
