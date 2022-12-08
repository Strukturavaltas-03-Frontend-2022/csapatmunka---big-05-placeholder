import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from 'src/app/service/backend/bill.service';
import { CustomerService } from 'src/app/service/backend/customer.service';
import { OrderService } from 'src/app/service/backend/order.service';
import { ProductHandlerService } from 'src/app/service/product-handler.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any

  public productsInfo = this.productHandlerSvc.getProductsInfo();
  public customerList$ = this.customerSvc.customerList$;
  public orderList$ = this.orderSvc.getAll();
  public billList$ = this.billSvc.getAll();


  constructor(
    private productHandlerSvc: ProductHandlerService,
    private customerSvc: CustomerService,
    private orderSvc: OrderService,
    private billSvc: BillService) {
    this.productHandlerSvc.getProducts();
  }

  ngOnInit(): void {
    const chartSettings = {
      series: [50,50],
      chart: {
        width: 380,
        type: "pie",
        foreColor: 'white'
      },
      labels: ["Active customers", "Inactive customers"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom",
            }
          }
        }
      ]
    };

    this.customerList$.subscribe(value=>{
      const dataNumbers = [
        value.filter(customer=> customer.active === true).length,
        value.filter(customer=> customer.active === false).length
      ]
      chartSettings.series=dataNumbers
      this.chartOptions=chartSettings
    })
  }

}
