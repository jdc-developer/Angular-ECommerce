import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$;
  userId: string;
  subscription: Subscription;

  constructor(private service: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    this.subscription = await this.authService.user$.subscribe(user => this.userId = user.uid);
    this.orders$ = await this.service.getByUser(this.userId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
