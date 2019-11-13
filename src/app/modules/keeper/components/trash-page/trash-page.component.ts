import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';
import { Note } from '../../../../models/note-model';
import { NoteService } from '../../../shared/services/note.service';
import { DialogueConfirmComponent } from '../../../shared/components/dialogue-confirm/dialogue-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-trash-page',
  templateUrl: './trash-page.component.html',
  styleUrls: ['./trash-page.component.css']
})
export class TrashPageComponent implements OnInit {

  constructor(private noteService: NoteService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getTrashNotes():Note[]{
    return this.noteService.getTrash();
  }

  clearConfirmDialogue(): void {
    const dialogRef = this.dialog.open(DialogueConfirmComponent, {
      width: '250px',
      data: 'Желаете очистить корзину? Все заметки будут удалены.'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.clearTrash();
        this.snackBar.open('Корзина была очищена', null, {duration: 2000});
      }
    });
  }

  clearTrash(){
    this.noteService.clearTrash();
  }

  restoreNote(note:Note){
    note.trash = false;
  }



}
