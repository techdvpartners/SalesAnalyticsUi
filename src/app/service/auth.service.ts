import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http:HttpClient) { 

    
  }
  protected get(url:string):Observable<any>{
    return this.http.get(url,this.httpOptions);
  }
  

	  httpOptions = {
      
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin' + ':' + 'password')
      })

	
    }
  
    protected post(url:string,body:any):Observable<any>{
      return this.http.post(url,body,this.httpOptions);
    }

	protected handleError(error: Response) {
	return Observable.throw(error)
}
}