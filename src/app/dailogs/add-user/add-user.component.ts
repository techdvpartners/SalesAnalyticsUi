import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from '../../service/sale.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup;
  error="";
  constructor(private saleService: SaleService, private dialog:MatDialog,public snackBar: MatSnackBar) {
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
        this.snackBar.open("User Added Successfully", "", {
          duration: 2000,
        })
        this.dialog.closeAll();
      },error=>{
        this.snackBar.open("Error Occured!!!","",{duration: 2000,})
      });
    }


  }
}
