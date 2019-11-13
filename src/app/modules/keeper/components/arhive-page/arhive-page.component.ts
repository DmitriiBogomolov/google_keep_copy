import { Component, OnInit } from '@angular/core';
import { Note } from '../../../../models/note-model';
import { NoteService } from '../../../shared/services/note.service';


@Component({
  selector: 'app-arhive-page',
  templateUrl: './arhive-page.component.html',
  styleUrls: ['./arhive-page.component.css']
})
export class ArhivePageComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit() {
  }

  getArhiveNotes():Note[]{
    return this.noteService.getArhieved();
  }

}
