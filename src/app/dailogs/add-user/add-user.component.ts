import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from '../../service/sale.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertService } from '../../service/alert/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup;
  error="";
  constructor(private saleService: SaleService, private dialog:MatDialog,private alert:AlertService) {
    this.addUserForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
     
    });
   }

  ngOnInit() {
  }

  addUser(){
    console.log(this.addUserForm.value);
    if(this.addUserForm.valid){
      this.saleService.addUser(this.addUserForm.value).subscribe(res=>{
        console.log(res);
        this.alert.showSuccess("User Added Successfully");
       
        this.dialog.closeAll();
      },error=>{
       // this.snackBar.open("Error Occured!!!","",{duration: 2000,})
       this.alert.showError("Error Occured!!!");
      });
    }


  }
}
