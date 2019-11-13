import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import * as uuid from 'uuid';
import { Note } from '../../../models/note-model';
import { Todo } from '../../../models/todo-model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes : Note[];
  constructor(private httpClient: HttpClient) {
    // Program default notes
    this.notes = [this.getDefaultNote()];
    // Json default NoteService
    this.httpClient.get("/assets/notesMock.json").subscribe(data => {
      this.notes = [];
      for(let index in data){
        this.notes.push(this.jsonToNote(data[index]));
      };
    });
  }

  // Converting json data to Note class
  jsonToNote(obj:object):Note{
    let newNote = new Note();
    for(let key in obj){
        newNote[key] = obj[key];
    }
    return newNote;
  }

  getNotes():Note[]{
    return this.notes;
  }

  // Get notes not trash and not arhive
  getValidNotes():Note[]{
    return this.notes.filter( note => {
      return (!note.arhieved && !note.trash);
    });
  }

  getNotesByLabel(label:string):Note[]{
    if (label) return this.getValidNotes().filter( note => note.labels.indexOf(label)!=-1 );
    else return this.getValidNotes();
  }

  // if (noticed) filter noticed else filter unnoticed
  filerNoticed(notes: Note[], noticed: boolean){
    if (noticed) return notes.filter( note => note.pin );
    else return notes.filter( note => !note.pin );
  }

  // if (coming) filter coming else filter past
  filterComingNotes(notes: Note[], coming: boolean){
    if (coming) return notes.filter( note => {
      return (note.date && note.date > new Date());
    });
    else return notes.filter( note => {
      return (note.date && note.date < new Date());
    });
  }

  getArhieved(){
    return this.notes.filter( note => {
      return (note.arhieved && !note.trash);
    });
  }

  getTrash(){
    return this.notes.filter( note => note.trash);
  }

  // Example note
  getDefaultNote():Note{
    return {id:uuid.v4(),title:'firsttitle',description:'firstdescription', pin:false,
            labels:[],selectedColor:0, color:'#fefefe', todoList:[],
            showTodo:false, arhieved:false, trash:false};
  }

  // Generate emptyNote
  getEmptyNote():Note{
    return {id:uuid.v4(), title:"", description:"", labels:[], selectedColor:0, pin:false,
            color:'#fefefe', todoList:[], showTodo:false, arhieved:false, trash:false}
  }

  // Note empty checking logic
  checkNoteIsEmpty(note:Note){
    if( note.title || note.description || note.imagePreview ||
              (note.todoList.length && note.showTodo) ) return false;
    else return true;
  }

  addNote(newNote:Note){
    newNote.id=uuid.v4();
    this.notes.push(newNote);
  }

  // Remove all trash notes
  clearTrash(){
    this.notes = this.notes.filter( note => !note.trash);
  }

  // Delete label from all notes
  destroyLabel(label:string){
    this.notes.forEach( (note) => {
      note.labels.splice(note.labels.indexOf(label), 1);
    });
  }

  // Rename label in all notes
  renameLabel(newLabel:string, oldLabel:string){
    this.notes.forEach( (note) => {
      note.labels[note.labels.indexOf(oldLabel)] = newLabel;
    });
  }

  // Swaps notes
  changingNotes(oldNote:Note,newNote:Note){
    let oldIndex = this.notes.findIndex( elem => elem == oldNote);
    let newIndex = this.notes.findIndex( elem => elem == newNote);
    [this.notes[oldIndex],this.notes[newIndex]]=[this.notes[newIndex],this.notes[oldIndex]]
  }


}
