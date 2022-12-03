import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, scan, tap } from 'rxjs';
import { SpinnerComponent } from 'src/app/common/spinner/spinner.component';



@Injectable({
  providedIn: 'root'
})
export class UiService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
  public loading = new BehaviorSubject<boolean>(false);

  constructor(private overlay: Overlay) {
    this.loading.pipe(
      map(loading => loading ? 1 : -1 ),
      scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0),
      tap((result) => {
        if(result === 1) {
          this.spinnerRef.hasAttached() ? null : this.showSpinner();
        } else if(!result) {
          this.spinnerRef.hasAttached() ? this.stopSpinner() : null;
        }
      })
    ).subscribe();
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(SpinnerComponent));
  }

  stopSpinner() {
    this.spinnerRef.detach();
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }
}

