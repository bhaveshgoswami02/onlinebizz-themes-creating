import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemesManagerService } from '../services/themes-manager.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  c
  theme_id=0;
  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('share') shareImg: ElementRef;
  ctx: any;
  file=null;
  page=true
  
  constructor(
    public _themeService: ThemesManagerService,
    public route:ActivatedRoute,
    public router:Router
    
  ) { 
    
  }

  ngOnInit(): void {
    console.log("website compo run")
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    if(!this._themeService.customDomain && this.route.snapshot.params["domain"]){
      this._themeService.changeDomain(this.route.snapshot.params["domain"])
    }
    if(!this._themeService.customDomain && !this.route.snapshot.params["domain"]){
      this.router.navigateByUrl("/getstarted")
    }
  }

  ngAfterViewInit(){
   /*  this.ctx  = this.canvasRef.nativeElement.getContext('2d');  
    this.shareImg.nativeElement.onload(res=>{
      this.ctx.drawImage(this.shareImg.nativeElement, 0,0);
    }) */
/*     var image = new Image();
    image.setAttribute('crossorigin', 'anonymous')
    image.setAttribute("width","200px")
    image.setAttribute("height","200px")
    image.onload = function() { 
      this.ctx.drawImage(image, 0,0);
      //console.log(this.canvasRef.nativeElement.toDataURL())
      this.file=this.canvasRef.nativeElement.toDataURL()
      var blob = this._themeService.dataURItoBlob(this.file);
      console.log(blob.type)
      this.file=new File([blob], "share.png",{type: blob.type})
    }.bind(this)
    image.src = "https://scontent.fjai1-1.fna.fbcdn.net/v/t1.0-9/117171825_2861503257292845_2202980085979363837_n.png?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=EcfNdKZmRhwAX8gS-O7&_nc_oc=AQlXNgPQYC7yGml0l1FCj1q0OrU0sX_AJb10-9Cs7JMy18sageLvWni4YOHmz2lRu-kCYo4TRKX48-la3udSXuOM&_nc_ht=scontent.fjai1-1.fna&oh=2f2048715748446975c95fdfbf3acf17&oe=5F67B164"; */
  }



  onImageLoad(){
    console.log("on load")
    this.c = document.createElement("canvas")
    this.c.width=300
    this.c.height=300
    this.ctx  = this.c.getContext("2d");
    this.ctx.drawImage(this.shareImg.nativeElement, 0,0,this.c.width,this.c.height)
    this.file=this.c.toDataURL()
    var blob = this._themeService.dataURItoBlob(this.file);
    this.file=new File([blob], "share.png",{type: blob.type})
    console.log(this.file)
  }

  getCover(){
    if(this._themeService?.data?.themeCover){
      return this._themeService?.data?.themeCover
    }
    else{
      return "../../assets/Images/default_product_cover_background.jpg";
    }
  }

  



}
