import { ShoppingCart } from './shopping-cart';
import { AppUser } from './app-user';

export class Order {

    key: string;
    name: string;
    address: string;
    city: string;
    cart: ShoppingCart;
}
