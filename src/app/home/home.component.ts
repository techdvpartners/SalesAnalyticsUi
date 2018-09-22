import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavMenuService } from '../service/nav-menu.service';
import { SaleService } from '../service/sale.service';
import { SalesData } from '../models/sales-data';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { saveAs } from '@progress/kendo-drawing/pdf';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { Observable, forkJoin } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[SaleService]

})

export class HomeComponent implements OnInit {
  revenue:any;
  margin:any;
  margin_per:any;
  quantity:any;
  flat_avg:any;
  weight_avg:any;
  
  @ViewChild("pdf")
  pdf;

  @ViewChild("excelexport")
  excelexport;

  constructor(private menuService:NavMenuService,private saleService:SaleService) { 
    
  }

  public data: SalesData[] = [];//[new SalesData('','Revenue',234567890.11,234567890.11,234567890.11,234567890.11,234567890.11),new SalesData('','Revenue',234567890.11,234567890.11,234567890.11,234567890.11,234567890.11)];

  ngOnInit() {
    console.log("Home");
    this.menuService.getNavClickMenu().subscribe((menuItem)=>{
      console.log("Menu Item",menuItem);
      if(menuItem === 'exportPdf'){
        console.log("PDF work here");
        this.pdf.saveAs('sales-analytics.pdf');
      }else if(menuItem === 'exportExcel'){
        this.excelexport.save();
      }
      
    });

    let promises=[];
    let revenuePromise=this.saleService.getData("Revenue");
    let marginPromise=this.saleService.getData("Margin");
    promises.push(revenuePromise);
    promises.push(marginPromise);

    forkJoin(promises).subscribe(res=>{

      this.data = res;
      console.log(res);

    });
    



    // this.saleService.getData("Revenue").subscribe(res=>{
    //   console.log("res",res);
    //   this.revenue=res;
    //   this.data.push(new SalesData('',this.revenue.calculationType,this.revenue.tier1,this.revenue.tier2,this.revenue.tier3,this.revenue.tier4,this.revenue.total));
    // });
    //   this.saleService.getData("Margin").subscribe(res=>{
    //     console.log("res",res);
    //     this.margin=res;
    //     this.data.push(new SalesData('',this.margin.calculationType,this.margin.tier1,this.margin.tier2,this.margin.tier3,this.margin.tier4,this.margin.total));
    //   });
    //   this.saleService.getData("Margin %").subscribe(res=>{
    //     console.log("res",res);
    //     this.margin_per=res;
    //     this.data.push(new SalesData('',this.margin_per.calculationType,this.margin_per.tier1,this.margin_per.tier2,this.margin_per.tier3,this.margin_per.tier4,this.margin_per.total));
    //   });
    //   this.saleService.getData("Quantity").subscribe(res=>{
    //     console.log("res",res);
    //     this.quantity=res;
    //     this.data.push(new SalesData('',this.quantity.calculationType,this.quantity.tier1,this.quantity.tier2,this.quantity.tier3,this.quantity.tier4,this.quantity.total));
    //   });
    //   this.saleService.getData("Flat Average Price per SKU").subscribe(res=>{
    //     console.log("res",res);
    //     this.flat_avg=res;
    //     this.data.push(new SalesData('',this.flat_avg.calculationType,this.flat_avg.tier1,this.flat_avg.tier2,this.flat_avg.tier3,this.flat_avg.tier4,this.flat_avg.total));
    //   });
    //   this.saleService.getData("Weighted Average Paid Price").subscribe(res=>{
    //     console.log("res",res);
    //     this.weight_avg=res;
    //     this.data.push(new SalesData('',this.weight_avg.calculationType,this.weight_avg.tier1,this.weight_avg.tier2,this.weight_avg.tier3,this.weight_avg.tier4,this.weight_avg.total));
    //   });

  }

}
