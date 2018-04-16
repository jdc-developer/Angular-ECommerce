import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product: Product) {
    const cartId = this.getOrCreateCartId();
    const items$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    let exists = false;
    let quantidade = 1;

    items$.snapshotChanges().subscribe(item => {
      if (item.payload.exists()) {
        quantidade = +item.payload.val().quantity;
        exists = true;
      }}
    );

    if (exists) {
      items$.update({ quantity: quantidade + 1 });
    } else {
      items$.set({ product: product, quantity: quantidade});
    }
  }
}
