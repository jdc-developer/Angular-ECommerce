import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartCardComponent } from './components/shopping-cart-card/shopping-cart-card.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'carrinho', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'sucesso/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'meus-pedidos', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartCardComponent,
    ShippingFormComponent
  ],
  exports: [
    ProductsComponent
  ]
})
export class ShoppingModule { }
