import { ShoppingCart } from '../shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from '../shared/models/shipping';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../shared/models/order';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart')
  cart: ShoppingCart;
  shipping: Shipping = {
    name: '',
    address: '',
    address1: '',
    city: ''
  };
  userId: string;
  userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async save() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/sucesso', result.key]);
  }
}
