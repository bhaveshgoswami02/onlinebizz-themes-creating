import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from 'src/app/services/themes-manager.service';
import { environment } from '../../../../../environments/environment'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Rgba } from 'ngx-color-picker';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  phoneNumber=""
  domainName = environment.domainName
  domainUrl = environment.domain
  
  constructor(
    public _themeService: ThemesManagerService
  ) { }

  ngOnInit(): void {
    
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

  changeLanguage(langCode:string="en"){
    var language = langCode;
    var selectField:any = document.querySelector("#google_translate_element select");
    for(var i=0; i < selectField.children.length; i++){
      var option:any = selectField.children[i];
      console.log(option)
      // find desired langauge and change the former language of the hidden selection-field 
      if(option.value==language){
         selectField.selectedIndex = i;
         // trigger change event afterwards to make google-lib translate this side
         selectField.dispatchEvent(new Event('change'));
         break;
      }
    }
  }

  languages = [
    {languageTitle:'English',languageCode:'en'},
    {languageTitle:'हिन्दी',languageCode:'hi'},
    {languageTitle:'मराठी',languageCode:'mr'},
    {languageTitle:'ગુજરાતી',languageCode:'gu'},
    {languageTitle:'தமிழ்',languageCode:'ta'},
    {languageTitle:'Swedish',languageCode:'sv'},
]

}
