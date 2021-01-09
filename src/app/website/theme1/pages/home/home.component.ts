import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from 'src/app/services/themes-manager.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
readMore:boolean = false
openModalImg:string;
services = []
products = []
gallery = []
testimonials = []
  constructor(
    public _themeService:ThemesManagerService,
  ) { }

  ngOnInit(): void {
    // this._themeService.getServices().subscribe(res=>{
    //   this.services = res
    // })
    // this._themeService.getProducts().subscribe(res=>{
    //   this.products = res
    // })
    // this._themeService.getGallery().subscribe(res=>{
    //   this.gallery = res
    // })
    // this._themeService.getTestimonials().subscribe(res=>{
    //   this.testimonials = res
    // })
  }

  openModal(imgUrl){
    this.openModalImg = imgUrl;
  }

  readMoreButton(){
    this.readMore = !this.readMore
  }

  getCover(){
    if(this._themeService?.data?.themeCover){
      return "url('"+this._themeService?.data?.themeCover+"')"
    }
    else{
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
}
