import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private service: ShoppingCartService) { }

  async placeOrder(order: Order) {
    const result = await this.db.list('/orders').push(order);
    this.service.clearCart();
    return result;
  }

  getAll() {
    return this.db.list('/orders').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
