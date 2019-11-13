import { Injectable } from '@angular/core';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private labels:string[];

  constructor(private noteService: NoteService) {
    this.labels = ['Источники вдохновения', 'Личный', 'Рабочий', 'Важное', 'Черновик'];
  }


  getLabels():string[]{
    return this.labels;
  }

  // Check label name is unique
  verifyUnique(newLabel:string):boolean{
    newLabel = this.transformString(newLabel);
    if (this.labels.indexOf(newLabel)!=-1) return false;
    else return true;
  }

  pushLabel(newLabel:string){
    this.labels.push( this.transformString(newLabel) );
  }

  deleteLabel(label:string){
    this.labels.splice(this.labels.indexOf(label), 1);
    this.noteService.destroyLabel(label);
  }

  renameLabel(newLabel:string, oldLabel:string){
    newLabel = this.transformString(newLabel);
    this.labels[this.labels.indexOf(oldLabel)] = newLabel;
    this.noteService.renameLabel(newLabel, oldLabel);
  }

  // Format label string
  transformString(str:string):string {
    if (!str) return str;
    return (str[0].toUpperCase() + str.slice(1).toLowerCase()).trim();
  }





}
