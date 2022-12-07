import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

let instanceCounter = 0;

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements AfterViewInit {
  public instance = ++instanceCounter;

  @Input() label = '';
  @Input() accessorName = '';
  @Input() ownFormControl = new FormControl();
  @Output() checked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    const toggleButtonEl = this.getToggleButtonEl();
    toggleButtonEl.style.cssText = '--toggle-button-slider-diameter:1rem';
  }

  onChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    if(target) {
      this.checked.emit(target.checked);
    }
  }

  private getToggleButtonEl() {
    const toggleButtonEl = document.querySelector(`#toggle-button-${this.instance}`);

    return (toggleButtonEl as HTMLElement);
  }
}
