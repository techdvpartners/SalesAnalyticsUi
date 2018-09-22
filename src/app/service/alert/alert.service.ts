import { Injectable } from '@angular/core';
import { ToastaService, ToastaConfig, ToastOptions } from 'ngx-toasta';

@Injectable()
export class AlertService {
  toastOptions:ToastOptions
  constructor(private toastr:ToastaService) {
    this.toastOptions = {
      title: "My title",
      msg: "The message",
      showClose: true,
      timeout: 5000,
      theme: 'default',
      
  };
  }

  showSuccess(msg) {
    console.log("msg",msg);
    this.toastOptions.title="Success"
    this.toastOptions.msg=msg
    this.toastr.success(this.toastOptions);
  }

  showError(msg) {
    this.toastr.error(
      {
        "title": "Error",     //A string or html for the title
        "msg": msg,       //A string or html for the message
       
        
    }
    );
  }

  showWarning(msg) {
    this.toastr.warning(
      {
        "title": "Alert ",     //A string or html for the title
        "msg": msg,       //A string or html for the message
       
        
    }
    );
  }



}
