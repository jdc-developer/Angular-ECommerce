import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { Shipping } from '../models/shipping';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: Shipping = {
    name: '',
    address: '',
    address1: '',
    city: ''
  };
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

 async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async save() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/sucesso', result.key]);
  }
}
