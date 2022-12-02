import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { CategoryService } from 'src/app/service/backend/category.service';
import { OrderService } from 'src/app/service/backend/order.service';
import { ProductService } from 'src/app/service/backend/product.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  service: OrderService = inject(OrderService)

  prodService: ProductService = inject(ProductService)

  list = combineLatest({
    prod: this.prodService.getAll(),
    ord: this.service.getAll(),
  }).pipe(
    map( result => result.ord.map( order => {
      order.product = result.prod.find( p => p.id === order.productID )
      return order
    }) )
  )

}
