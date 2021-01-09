import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // GoogleMapsModule,
    RouterModule,
    // ScrollToModule.forRoot()
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    // GoogleMapsModule,
    RouterModule,
    // ScrollToModule,
    // CarouselModule,
  ]
})
export class SharedModule { }
