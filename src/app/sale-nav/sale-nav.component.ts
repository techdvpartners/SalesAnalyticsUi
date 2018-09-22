import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddUserComponent } from '../dailogs/add-user/add-user.component';
import { NavMenuService } from '../service/nav-menu.service';
import { SaleService } from '../service/sale.service';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ReportIssueComponent } from '../dailogs/report-issue/report-issue.component';

@Component({
  selector: 'app-sale-nav',
  templateUrl: './sale-nav.component.html',
  styleUrls: ['./sale-nav.component.css'],
  providers:[SaleService]
})
export class SaleNavComponent {
  
  categories=[];
  subGroups=[];
  groups=[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  username:string;

  constructor(private breakpointObserver: BreakpointObserver,private dialog: MatDialog,private navService:NavMenuService,private saleService:SaleService,private router:Router) {}
  ngOnInit(){
  console.log("Ng on init");

  let encodedString = localStorage.getItem("auth");
  let decodedString = atob(encodedString);
  this.username = decodedString.split(":")[0];

  this.saleService.getDropdownData("category").subscribe(res=>{
    this.categories=res;

  });
  this.saleService.getDropdownData("group").subscribe(res=>{
    this.groups=res;

  });
  this.saleService.getDropdownData("subgroup").subscribe(res=>{
    this.subGroups=res;

  })
}
  openUserdailog(){
    if(this.username=='admin'){
      const dialogRef = this.dialog.open(AddUserComponent, {
        width: '40%',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
    }else{
     //TO-DO:Message to show - Not Authorized to perform action
    }

  }

  openReportIssuedailog(){
    const dialogRef = this.dialog.open(ReportIssueComponent, {
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
  logout(){
    localStorage.removeItem("auth");
    this.router.navigateByUrl("/login");
  }
  
  }
