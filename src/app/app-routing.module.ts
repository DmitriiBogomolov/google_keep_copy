import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotePageComponent } from './modules/keeper/components/note-page/note-page.component';
import { GridLayoutComponent } from './modules/keeper/components/grid-layout/grid-layout.component';
import { AlertPageComponent } from './modules/keeper/components/alert-page/alert-page.component';
import { ArhivePageComponent } from './modules/keeper/components/arhive-page/arhive-page.component';
import { TrashPageComponent } from './modules/keeper/components/trash-page/trash-page.component';

const routes: Routes = [
  {path:'', redirectTo: '/notes', pathMatch:'full'},
  {path: 'notes', component: NotePageComponent},
  {path: 'label/:labelId', component: NotePageComponent},
  {path: 'alerts', component: AlertPageComponent},
  {path: 'arhive', component: ArhivePageComponent},
  {path: 'trash', component: TrashPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
