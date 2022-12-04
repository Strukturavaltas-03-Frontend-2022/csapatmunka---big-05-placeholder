import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Order } from 'src/app/common/model/order';
import { OrderService } from 'src/app/service/backend/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit  {

  order$: Observable<Order> = this.ar.params.pipe(
    switchMap( params => this.orderService.get( params['id'] ) ),
  );


  constructor(
    private ar: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(order: Order): void {
    this.orderService.update(order).subscribe(
      order => this.router.navigate(['/', 'orders']),
    );
  }

}
