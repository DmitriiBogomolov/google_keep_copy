import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { NoteMenuComponent } from '../note-menu/note-menu.component';
import { NoteEditBodyComponent } from '../note-edit-body/note-edit-body.component';
import { Note } from '../../../../models/note-model';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.css']
})
export class EditNoteModalComponent implements OnInit {
  fileProgress:boolean = false;

  constructor(
        public dialogRef: MatDialogRef<EditNoteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public note: Note) {}

  ngOnInit() {
  }

  closeClick(): void {
    this.dialogRef.close();
  }

  //Toggle fileProgress bar
  setFileProgress(fileProgress:boolean){
    this.fileProgress = fileProgress;
  }

}
