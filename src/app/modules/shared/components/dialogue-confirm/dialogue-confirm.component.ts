import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-confirm',
  templateUrl: './dialogue-confirm.component.html',
  styleUrls: ['./dialogue-confirm.component.css']
})
export class DialogueConfirmComponent implements OnInit {

  //Reusable modal confirm dialogue
  constructor(
    public dialogRef: MatDialogRef<DialogueConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
