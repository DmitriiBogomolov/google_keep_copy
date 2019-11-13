import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NewNoteComponent } from '../../../keeper/components/new-note/new-note.component';
import { LabelService } from '../../services/label.service';
import { EditLabelModalComponent } from '../../../keeper/components/edit-label-modal/edit-label-modal.component';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import { UrlNamingService } from '../../services/url-naming.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  labels:string[];
  routeName:string = 'Keeper';
  private currentUrl: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private labelService: LabelService,
              public dialog: MatDialog,
              public router: Router,
              private urlNamingService: UrlNamingService){

      this.labels = labelService.getLabels();

      // Get url pseudonym on route change
      this.router.events.subscribe(event => {
        if(event instanceof NavigationStart){
        }
        if(event instanceof NavigationEnd){
          this.routeName = urlNamingService.getRouteName();
        }
      });

  }

  // Open edit label modal dialogue
  openDialog(): void {
    const dialogRef = this.dialog.open(EditLabelModalComponent, {
      width: '300px',
      data:this.labels
    });
    // Close modal event handler
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
