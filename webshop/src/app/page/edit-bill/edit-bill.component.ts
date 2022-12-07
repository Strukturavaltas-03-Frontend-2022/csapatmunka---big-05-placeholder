import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Bill } from 'src/app/common/model/bill';
import { BillService } from 'src/app/service/backend/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent {

  bill$: Observable<Bill> = this.ar.params.pipe(
    switchMap( params => this.billService.get( params['id'] ) ),
  );

  constructor(
    private ar: ActivatedRoute,
    private billService: BillService,
    private router: Router,
  ) { }

  onUpdate(bill: Bill): void {
    this.billService.update(bill).subscribe(
      bill => this.router.navigate(['/', 'bills']),
    );
  }

}
