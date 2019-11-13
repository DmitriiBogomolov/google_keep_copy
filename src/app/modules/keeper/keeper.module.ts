import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EditNoteModalComponent } from "./components/edit-note-modal/edit-note-modal.component";
import { NewNoteComponent } from "./components/new-note/new-note.component";
import { GridLayoutComponent } from "./components/grid-layout/grid-layout.component";
import { NoteEditBodyComponent } from "./components/note-edit-body/note-edit-body.component";
import { TrashPageComponent } from "./components/trash-page/trash-page.component";
import { NotePageComponent } from "./components/note-page/note-page.component";
import { NoteComponent } from "./components/note/note.component";
import { EditLabelModalComponent } from "./components/edit-label-modal/edit-label-modal.component";
import { NoteLabelsComponent } from "./components/note-labels/note-labels.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AlertPageComponent } from "./components/alert-page/alert-page.component";
import { NoteMenuComponent } from "./components/note-menu/note-menu.component";
import { ArhivePageComponent } from "./components/arhive-page/arhive-page.component";

@NgModule({
  declarations: [
    NotePageComponent,
    NewNoteComponent,
    EditNoteModalComponent,
    NoteComponent,
    EditLabelModalComponent,
    NoteMenuComponent,
    NoteEditBodyComponent,
    NoteLabelsComponent,
    GridLayoutComponent,
    TodoListComponent,
    AlertPageComponent,
    ArhivePageComponent,
    TrashPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [

  ],
  entryComponents: [EditNoteModalComponent, EditLabelModalComponent]
})
export class KeeperModule { }
