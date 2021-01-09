import { Injectable } from '@angular/core';
import { ThemesManagerService } from './themes-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart=[]
  constructor(public theme:ThemesManagerService) {
    this.setCart()
   }

  addProductToCart(product){
    this.cart.push({product:product,qty:1})
    this.updateLocalStorage()
  }

  removeProductFromCart(product){
    this.cart = this.cart.filter(element=>{
      if(element.product.id==product.id){
        return false
      }else{
        return true
      }
    })
    this.updateLocalStorage()
  }

  incrementProductQty(product){
    this.cart.forEach(element=>{
      if(element.product.id==product.id){
        element.qty++
      }
    })
    this.updateLocalStorage()
  }
  decrementProductQty(product){
    console.log(product)
    console.log(this.cart)
    this.cart.forEach(element=>{
      if(element.product.id==product.id){
        element.qty--
        if(element.qty==0){
          this.removeProductFromCart(product)
        }
      }
    })
    this.updateLocalStorage()
  }
  clearCart(){
    this.cart=[]
    this.updateLocalStorage()
  }
  updateLocalStorage(){
    localStorage.setItem(this.theme.domainName+"cart",JSON.stringify(this.cart))
  }

  setCart(){
    if(localStorage.getItem(this.theme.domainName+"cart")){
      this.cart=JSON.parse(localStorage.getItem(this.theme.domainName+"cart"))
    }else{
      this.cart=[]
      this.updateLocalStorage()
    }
  }
  getCart(){
    return this.cart
  }

  getProductSnapshotInCart(product){
    let cartProduct=false
    this.cart.forEach(element=>{
      if(element.product==product){
        cartProduct=element
      }
    })
    return cartProduct
  }

  isProductInCart(product){
    let result = false
    this.cart.forEach(element=>{
      if(element.product.id == product.id){
        result=element
      }
    })
    return result
  }

  getCartTotal(){
    let total = 0;
    this.cart.forEach(element=>{
      let amount = element.product.itemPrice * element.qty
      total=total+amount
    })
    return total
  }
}
