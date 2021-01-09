import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)}
/*   { path: '',   redirectTo: '/admin', pathMatch: 'full' } */
  // {path: '**', redirectTo:"",pathMatch:"prefix"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
