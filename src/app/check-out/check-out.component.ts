import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  order: Order = {
    key: '',
    name: '',
    address: '',
    city: '',
    cart: null
  };

  cart$;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router) { }

 async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.router.navigate(['/order-success']);
  }

  save(order) {
    this.orderService.create(order);
  }
}
