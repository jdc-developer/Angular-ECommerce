import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  create(order: Order) {
    return this.db.list('/orders').push(order);
  }

  getAll() {
    return this.db.list('/orders').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
