import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ThemesManagerService } from 'src/app/services/themes-manager.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menu:boolean = false
  @ViewChild("toggle") toggle:ElementRef
  constructor(
    public _themeService: ThemesManagerService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    if(this._themeService.data.mainMenu && this._themeService.data?.mainMenu?.length>0){
      this.menu = true
    }
    else
    {
      this.menu = false
    }
  }

  closeNav(){
    console.log(window.innerWidth)
    if(window.innerWidth<=950){
      this.toggle.nativeElement.click()
    }
  }

}
