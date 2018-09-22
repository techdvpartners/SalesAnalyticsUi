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
  providers:[SaleService],
  
  styles: [`
    kendo-pdf-document  {
         font-size: 10px;
         color:red !important
    }

   
  `]
  })

export class HomeComponent implements OnInit {
  revenue:any;
  margin:any;
  margin_per:any;
  quantity:any;
  flat_avg:any;
  weight_avg:any;
  tableStyle={
    'font-size':'14px'
  }
  tableStyleHeader={
    'font-size':'16px'
  }
  
  
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

    this.menuService.getFilterData().subscribe(filterOptions=>{
      console.log(filterOptions);
      this.getData(filterOptions);
    })

    this.getData();

  }
  getData(filterOtions?){
    let promises=[];
    let revenuePromise=this.saleService.getData("Revenue",filterOtions);
    let marginPromise=this.saleService.getData("Margin",filterOtions);
    let marginPerPromise=this.saleService.getData("Margin %",filterOtions);
    let quantityPromise=this.saleService.getData("Quantity",filterOtions);
    let avgSKUPromise=this.saleService.getData("Flat Average Price per SKU",filterOtions);
    let avgPricePromise=this.saleService.getData("Weighted Average Paid Price",filterOtions);

    promises.push(revenuePromise);
    promises.push(marginPromise);
    promises.push(marginPerPromise);
    promises.push(quantityPromise);
    promises.push(avgSKUPromise);
    promises.push(avgPricePromise);

    forkJoin(promises).subscribe(res=>{
      this.data = res;
      console.log(res);
    });
    
  }

}
