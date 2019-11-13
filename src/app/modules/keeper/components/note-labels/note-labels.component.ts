import { Component, OnInit, Input } from '@angular/core';
import { LabelService } from '../../../shared/services/label.service';
import { Note } from '../../../../models/note-model';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-note-labels',
  templateUrl: './note-labels.component.html',
  styleUrls: ['./note-labels.component.css']
})
export class NoteLabelsComponent implements OnInit {
  @Input() note: Note;
  @Input() shortMode: boolean; // Display only maxShowLabels
  labelList: string[];
  maxShowLabels: number = 4; // Number of displayed tags

  constructor(private labelService: LabelService) {
    this.labelList = labelService.getLabels();
  }

  ngOnInit() {
  }

  // Check is note has label
  labelActive(index):boolean{
    if (this.note.labels.indexOf(this.labelList[index]) != -1) return true;
    else return false;
  }

  // Displayed current tag
  needToShowLabel(index:number):boolean{
    if(this.shortMode){
      let labelCount: number = this.note.labels.length;
      let alarmCount: number = 0;
      if ( this.note.date != undefined && this.note.date != null ) alarmCount = 1;

      if (index+alarmCount > this.maxShowLabels-1) return false;
      else if ( index+alarmCount == this.maxShowLabels-1 && (labelCount - 1) > (index) ) return false;
      else return true;
    }
    else return true;
  }

  // Is tags number more than max?
  getMoreTrigger(){
    if(this.shortMode){
      let labelCount: number = this.note.labels.length;
      let alarmCount: number = 0;
      if ( this.note.date != undefined && this.note.date != null ) alarmCount = 1;

      if ( (alarmCount + labelCount) > this.maxShowLabels ){
        return true;
      }
      else return false;
    }
    else return false;
  }

  // Get number of tags over the max displayed
  getMoreNumber(){
    let labelCount: number = this.note.labels.length;
    let alarmCount: number = 0;
    if ( this.note.date != undefined && this.note.date != null ) alarmCount = 1;
    return ( labelCount + alarmCount - this.maxShowLabels + 1);
  }

  removeAlarm(){
    this.note.date = undefined;
    this.note.time = undefined;
  }

  removeLabel(index:number){
      this.note.labels.splice(index, 1);
  }


}
