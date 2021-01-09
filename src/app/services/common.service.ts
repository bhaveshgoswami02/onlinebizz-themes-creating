import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService,private loader: NgxUiLoaderService) { }

  showToast(type:string,title:string,message:string) {
    if(type=="success"){
      this.toastr.success(title,message)
    }
    if(type=="error"){
      this.toastr.error(title,message)
    }
    if(type=="info"){
      this.toastr.info(title,message)
    }
    if(type=="warning"){
      this.toastr.warning(title,message)
    }
  }
  showLoader(){
    this.loader.start();
  }
  stopLoader(){
    this.loader.stop()
  }

    processImages(files:[]) {
      let images=[]
    if (files.length === 0)
      return; 
    files.forEach((file:any)=>{
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.showToast("danger","Invalid File","Only Images are supported")
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        //this.imgURL = reader.result; 
        //this.image=files[0];
        images.push(reader.result)
      }
    })
  }
}
