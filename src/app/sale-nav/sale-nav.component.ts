import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddUserComponent } from '../dailogs/add-user/add-user.component';
import { NavMenuService } from '../service/nav-menu.service';

@Component({
  selector: 'app-sale-nav',
  templateUrl: './sale-nav.component.html',
  styleUrls: ['./sale-nav.component.css']
})
export class SaleNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,private dialog: MatDialog,private navService:NavMenuService) {}

  openUserdailog(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

  

  }
  navClick(menuItem:string){
    this.navService.setNavClick(menuItem);

  }
  
  }
