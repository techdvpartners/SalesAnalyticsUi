import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-sku',
  templateUrl: './show-sku.component.html',
  styleUrls: ['./show-sku.component.css']
})
export class ShowSkuComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("data",this.data);
  }

}
