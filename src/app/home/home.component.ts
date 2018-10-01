import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavMenuService } from '../service/nav-menu.service';
import { SaleService } from '../service/sale.service';
import { SalesData } from '../models/sales-data';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { saveAs } from '@progress/kendo-drawing/pdf';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { Observable, forkJoin, empty } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ShowSkuComponent } from '../dailogs/show-sku/show-sku.component';

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
  })

export class HomeComponent implements OnInit {
  revenue:any;
  margin:any;
  margin_per:any;
  quantity:any;
  flat_avg:any;
  weight_avg:any;
  tableStyle={
    'font-size':'15px',
    'text-align':'center'
  }
  tableStyleHeader={
    'font-size':'15px',
    'text-align':'center'
  }
  tableStyleCalcName={
    'font-size':'15px',
    'text-align':'left'
  }
  headerStyle={
    'background-color': '#666',
    'color': '#fff',
    'line-height': '1em',
    'font-size':'16px',
    'text-align':'center'
  }
  
  
  
  @ViewChild("pdf")
  pdf;

  @ViewChild("excelexport")
  excelexport;

  constructor(private menuService:NavMenuService,private saleService:SaleService,private dialog:MatDialog) { 
    
  }

  public data: any = [];

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
    let skuPromise = this.saleService.getSKUData("SKUs",filterOtions);
    let kpiPromise=this.saleService.getData("kpi",filterOtions);  
    //let revenuePromise=this.saleService.getData("Revenue",filterOtions);  
    //let marginPromise=this.saleService.getData("Margin",filterOtions);
    //let marginPerPromise=this.saleService.getData("Margin %",filterOtions);
    //let quantityPromise=this.saleService.getData("Quantity",filterOtions);
    //let avgSKUPromise=this.saleService.getData("Flat Average Price per SKU",filterOtions);
    //let avgPricePromise=this.saleService.getData("Weighted Average Paid Price",filterOtions);

    promises.push(skuPromise);
    promises.push(kpiPromise);
    //promises.push(revenuePromise);
    //promises.push(marginPromise);
    //promises.push(marginPerPromise);
    //promises.push(quantityPromise);
    //promises.push(avgSKUPromise);
    //promises.push(avgPricePromise);

    forkJoin(promises).subscribe(res=>{
     this.data = res[1];
     if(this.data){
     this.data.splice(0,0,res[0]);
     this.data.splice(5,0,{calculationType:" "});
     }
    });
    
  }
  onSkuClick(items){
    console.log("item",items)
    if(items && items.length>0){
      const dialogRef = this.dialog.open(ShowSkuComponent, {
        width: '40%',
        data: items
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
      
    }

  }
}
