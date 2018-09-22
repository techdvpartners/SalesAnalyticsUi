import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends AuthService{
  
  getDropdownData(type:string){
    return this.get(type+"/distinct");
  }
  getData(type){

     return this.post("thistimelastyear/calculate",{"calculationType": type})
  }

  addUser(userData){
    return this.post("user",userData)
  }

  
}
