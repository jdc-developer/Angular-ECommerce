import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product')
  product: Product;

  // tslint:disable-next-line:no-input-rename
  @Input('show-actions')
  showActions = true;

  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart')
  shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
