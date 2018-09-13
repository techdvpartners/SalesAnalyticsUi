import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

   private navClickSrc = new Subject<string>();
   
  public setNavClick(menuitem:string): void {
    this.navClickSrc.next(menuitem);
  }
  public getNavClickMenu(): Observable<string>{
    return this.navClickSrc.asObservable();
  }

}
