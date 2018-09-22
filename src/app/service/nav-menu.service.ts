import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

   private navClickSrc = new Subject<string>();
   
   private filterData=new Subject<any>();
  public setNavClick(menuitem:string): void {
    this.navClickSrc.next(menuitem);
  }
  public setFilterData(filterData:any): void {
    this.filterData.next(filterData);
  }
  public getNavClickMenu(): Observable<string>{
    return this.navClickSrc.asObservable();
  }
  public getFilterData(): Observable<string>{
    return this.filterData.asObservable();
  }

}
