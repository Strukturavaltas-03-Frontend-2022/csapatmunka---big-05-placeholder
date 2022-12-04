import { Component, inject, OnInit } from '@angular/core';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { BillService } from 'src/app/service/bill.service';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent  {
  billService: BillService = inject(BillService);
  configService: ConfigService = inject(ConfigService);

  columns: ITableColumn[] = this.configService.billTableColumns;
  userList$: Observable<Bill[]> = this.billService.getAll();


  constructor(

  ) { }



}
