import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SalesData } from '../models/sales-data';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends AuthService{
  
  getDropdownData(type:string){
    return this.get(type+"/distinct");
  }
  getData(type,filterOptions?){
if(filterOptions){
return  this.post("thistimelastyear/calculate",{"calculationType": type,"salesFilter":filterOptions})

}else{
  return this.post("thistimelastyear/calculate",{"calculationType": type})
}
    
  
}

  addUser(userData){
    return this.post("user",userData)
  }
  getFilterData(type,data){

    return this.post("thistimelastyear/calculate",{"calculationType": type,salesFilter:data})
 }

  
}
