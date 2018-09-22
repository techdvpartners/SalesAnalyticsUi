import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent  implements OnInit, OnDestroy {
  progressRef: NgProgressRef;
  overlay=false;
  constructor(private ngProgress: NgProgress) { }
  ngOnInit() {
    //this.progressRef = this.ngProgress.ref();

    // Progress bar actions (optional)
    //this.progressRef.start();
    
    //this.progressRef.inc();
    
    // Get progress bar events (optional)
    //this.progressBar.started.subscribe(() => this.onStarted());
   // this.progressBar.completed.subscribe(() => this.onCompleted());
  }

  ngOnDestroy() {
    //this.ngProgress.destroy();
  }
  onStart(){
    this.overlay=true;

  }
  onCompleted(){
    this.overlay=false;

  }
}
