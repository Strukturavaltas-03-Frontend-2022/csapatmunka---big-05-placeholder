import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent  {

  constructor(
    private config: ConfigService,
    private billService: billService,
  ) { }

}
