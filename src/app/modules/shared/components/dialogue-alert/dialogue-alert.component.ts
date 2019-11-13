import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-alert',
  templateUrl: './dialogue-alert.component.html',
  styleUrls: ['./dialogue-alert.component.css']
})
export class DialogueAlertComponent implements OnInit {

  //Reusable modal alert
  constructor(
        public dialogRef: MatDialogRef<DialogueAlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


}
