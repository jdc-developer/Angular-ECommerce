import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-card',
  templateUrl: './shopping-cart-card.component.html',
  styleUrls: ['./shopping-cart-card.component.css']
})
export class ShoppingCartCardComponent implements OnInit {

  @Input('shopping-cart')
  cart: ShoppingCart;

  constructor() { }

  ngOnInit() {
  }

}
