import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { ValidityExpiredComponent } from './validity-expired/validity-expired.component';
import { WebsiteComponent } from "./website.component";

const routes: Routes = [
  {path:'',component:WebsiteComponent},
  {path:'home',component:WebsiteComponent},
  {path:'about',component:WebsiteComponent},
  {path:'services',component:WebsiteComponent},
  {path:'services/:slug',component:WebsiteComponent},
  {path:'gallery',component:WebsiteComponent},
  {path:'payments',component:WebsiteComponent},
  {path:'products',component:WebsiteComponent},
  {path:'products/:id',component:WebsiteComponent},
  {path:'contact',component:WebsiteComponent},
  {path:'cart',component:WebsiteComponent},
  {path:'checkout',component:WebsiteComponent},
  {path:'order-successful',component:WebsiteComponent},
  {path:'pages/:page',component:WebsiteComponent},
//   {path:"validity-expired",component:ValidityExpiredComponent},
  {path:':domain',component:WebsiteComponent},
  {path:':domain/services/:slug',component:WebsiteComponent},
  {path:':domain/products/:id',component:WebsiteComponent},
  {path:':domain/:page',component:WebsiteComponent},
  {path:':domain/pages/:page',component:WebsiteComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WebsiteRoutingModule {}