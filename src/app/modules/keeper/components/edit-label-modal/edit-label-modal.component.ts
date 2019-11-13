import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { LabelService } from '../../../shared/services/label.service';
import { DialogueConfirmComponent } from '../../../shared/components/dialogue-confirm/dialogue-confirm.component';
import { DialogueAlertComponent } from '../../../shared/components/dialogue-alert/dialogue-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-label-modal',
  templateUrl: './edit-label-modal.component.html',
  styleUrls: ['./edit-label-modal.component.css']
})
export class EditLabelModalComponent implements OnInit {
  newLabel:string = "";
  constructor(
          public dialog: MatDialog,
          public dialogRef: MatDialogRef<EditLabelModalComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any,  // Mat-Dialogue-Data as LabelList
          private labelService: LabelService,
          private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  customTrackBy(index: number): any {
      return index;
  }

  focusInput(editBtnBody: HTMLInputElement){
    editBtnBody.classList.add('editActive');
  }

  saveInput(labelInput: HTMLInputElement, index: number, editBtnBody: HTMLInputElement, label:string){
      //Unique verify
    if(labelInput.value.toLowerCase() == this.data[index].toLowerCase() || this.labelService.verifyUnique(labelInput.value)){
      this.data[index] = labelInput.value;
      editBtnBody.classList.remove('editActive');
      this.renameLabel(labelInput.value, label);
    }
    else{
      // New label name does not pass unique verify
      labelInput.value = this.data[index];
      labelInput.focus();
      this.AlertDialogue();
    }
  }

  addNewLabel(newLabelIInput: HTMLInputElement, needFocus:boolean){
    // Unique verify
    if (this.labelService.verifyUnique(newLabelIInput.value)){
      this.labelService.pushLabel(newLabelIInput.value);
      newLabelIInput.value = "";
      newLabelIInput.blur();
      //If enterPress event set focus
      if (needFocus) newLabelIInput.focus();
    }
    // New label does not pass unique verify
    else {
      this.AlertDialogue();
      newLabelIInput.focus();
    }


  }

  deleteConfirmDialogue(label:string): void {
    const dialogRef = this.dialog.open(DialogueConfirmComponent, {
      width: '250px',
      data: 'Удалить ярлык? Он исчезнет со всех заметок, при этом сами заметки сохранятся.'
    });
    //AfterClose handler
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteLabel(label);
        this.snackBar.open('Ярлык был удален', null, {duration: 2000});
      }
    });
  }

  AlertDialogue(): void {
    const dialogRef = this.dialog.open(DialogueAlertComponent, {
      width: '250px',
      data: 'Такая заметка уже существует!'
    });
    //AfterClose handler
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  renameLabel(newLabel:string, oldLabel:string){
    this.labelService.renameLabel(newLabel, oldLabel);
  }
  deleteLabel(label:string){
    this.labelService.deleteLabel(label);
  }

}
