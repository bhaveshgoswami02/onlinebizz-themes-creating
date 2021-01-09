import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './website.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { Theme1Module } from './theme1/theme1.module';
import { WebsiteLoaderComponent } from './website-loader/website-loader.component';


@NgModule({
  declarations: [
    WebsiteComponent,
    WebsiteLoaderComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    Theme1Module,
  ],
  exports: [
    WebsiteComponent
  ]
})
export class WebsiteModule { }
