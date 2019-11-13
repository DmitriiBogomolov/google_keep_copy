import { Component, OnInit } from '@angular/core';
import { Note } from '../../../../models/note-model';
import { NoteService } from '../../../shared/services/note.service';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.css']
})
export class AlertPageComponent implements OnInit {
  defaultAlarmHours: number = 5;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
  }

  //get past'n'comming alerts
  getPastAlerts():Note[]{
    return this.noteService.filterComingNotes(this.noteService.getValidNotes(), false);
  }
  getComingAlerts():Note[]{
    return this.noteService.filterComingNotes(this.noteService.getValidNotes(), true);
  }

  // Get datetime as current datetime + defalutAlamHours for newNoteComponent
  getNewNoteDate():Date{
    let date = new Date();
    date.setTime(date.getTime()+(this.defaultAlarmHours*60*60*1000));
    return date;
  }


}
