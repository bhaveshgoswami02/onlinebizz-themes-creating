import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ThemesManagerService } from 'src/app/services/themes-manager.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService:CartService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    console.log(this.cartService.cart)
  }

  removeItemFromCart(product){
    this.cartService.removeProductFromCart(product)
  }


}
