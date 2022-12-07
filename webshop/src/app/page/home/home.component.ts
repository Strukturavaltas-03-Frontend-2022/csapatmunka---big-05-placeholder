import { Component, OnInit } from '@angular/core';
import { ProductHandlerService } from 'src/app/service/product-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productsInfo = this.productHandlerSvc.getProductsInfo();

  constructor(private productHandlerSvc: ProductHandlerService,) {
    this.productHandlerSvc.getProducts();
  }

  ngOnInit(): void {
  }

}
