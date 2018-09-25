import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  apiUrl="http://54.86.137.224:8001/";
  //apiUrl="http://localhost:8001/"
  constructor(protected http:HttpClient) { 

    
  }

  protected getHeaderOptions(){
    //Should be an base 64 of username and password
   let auth=  localStorage.getItem("auth");
    
  let  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + auth
      })
   };
    return httpOptions;

    
  
  
    //  return {
        
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Authorization': 'Basic ' + btoa(auth.username + ':' + auth.password)
    //     })
    
    
    
    //   };

  }
  protected get(endPoint:string,headerOptions?):Observable<any>{
    return this.http.get(this.apiUrl+endPoint,headerOptions?headerOptions:this.getHeaderOptions());
  }
   protected post(endPoint:string,body:any,headerOptions?):Observable<any>{
      return this.http.post(this.apiUrl+endPoint,body,headerOptions?headerOptions:this.getHeaderOptions());
    }

    loginHeaderOptions(username,password){
      let  httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':  'Basic ' + btoa(username + ':' + password)
          })
       };
       return httpOptions;
    }

    login(username,password){
      let headerOptions=this.loginHeaderOptions(username,password);
      //console.log("header options",headerOptions)
      return this.get("user/login",headerOptions)
    }
    

	protected handleError(error: Response) {
	return Observable.throw(error)
}
}