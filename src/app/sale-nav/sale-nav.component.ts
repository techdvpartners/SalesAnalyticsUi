import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectionListChange, MatListOption} from '@angular/material';
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
  
  superCategories=[];
  categories=[];
  subGroups=[];
  groups=[];
  supcatSelectedOptions: string[]=[]
  catSelectedOptions: string[]=[]
  groupSelectedOptions: string[]=[]
  subSelectedOptions: string[]=[];
  @ViewChild("drawer") drawer;
  @ViewChild("drawerEnd") drawerEnd;
  


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
  this.getDropdown();
  
}

getDropdown(){
  this.saleService.getDropdownData("supercategory").subscribe(res=>{
    this.superCategories=res;

  });
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
    this.drawer.close();

  }

  openReportIssuedailog(){
    const dialogRef = this.dialog.open(ReportIssueComponent, {
      width: '40%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.drawer.close();

  }


  navClick(menuItem:string){
    this.navService.setNavClick(menuItem);
    this.drawer.close();

  }
  logout(){
    localStorage.removeItem("auth");
    this.router.navigateByUrl("/login");
  }
  onChangesupCat(eve){
    console.log("eve",eve)
    let filterOptions={
      supcategories:eve
    }
    console.log(filterOptions);
      this.saleService.getDropdownFilter("supercategory",filterOptions).subscribe(res=>{
      this.catSelectedOptions=[];
      this.groupSelectedOptions=[];
      this.subSelectedOptions=[];
      this.categories= res.cat;
      this.groups= res.grps;
      this.subGroups=res.subgroups;
     
     console.log("aas",res)
      })
  }
  onChangeCat(eve){
    //group/filtered
    console.log("eve",eve)
    
    let filterOptions={
      categories:eve
    }
    console.log(filterOptions);
    this.saleService.getDropdownFilter("category",filterOptions).subscribe(res=>{
     this.groupSelectedOptions=[];
     this.subSelectedOptions=[];
     this.groups= res.grps;
     this.subGroups=res.subgroups;
    
    console.log("aas",res)
    })

  
  }
  onChangeGroup(eve){
    console.log("on group change",eve);
    let filterOptions={
      groups:eve
    }
    this.saleService.getDropdownFilter("group",filterOptions).subscribe(res=>{
      this.subSelectedOptions=[];
      this.subGroups=res.subgroups;
      console.log("aas",res)
      //this.subGroups=res;

    })
  }
  onFilter(){
    let filterOptions={
      "supcategories":this.supcatSelectedOptions,
      "categories":this.catSelectedOptions,
      "groups":this.groupSelectedOptions,
      "subGroups":this.subSelectedOptions
    };
    // this.saleService.getFilterData(filterOptions).subscribe(res=>{
    //   console.log("filter data",res);
    // })
    this.navService.setFilterData(filterOptions);
    this.drawerEnd.close();
    

    
   // console.log("data",filterOptions)
  }
  onReset(){
    this.supcatSelectedOptions=[];
    this.groupSelectedOptions=[];
    this.catSelectedOptions=[];
    this.subSelectedOptions=[];
    this.getDropdown();
    this.onFilter();
    //console.log(this.drawer);
    this.drawerEnd.close();


  }
  
  }
