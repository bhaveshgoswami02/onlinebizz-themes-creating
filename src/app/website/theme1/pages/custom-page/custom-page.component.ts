import { Component, Input, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {
  @Input("selectedPage") pageTitle
  content=""
  constructor(public page:PageService) { }

  ngOnInit(): void {
    this.page.getSingle(this.pageTitle).subscribe((res:any)=>{
      console.log(res)
      this.content=res.content 
    })
  }

}
