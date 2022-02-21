import {ChangeDetectorRef, Component} from '@angular/core';
import {SpinnerHandlerService} from "./spinner-handler.service";


@Component({
  selector: 'spinner',
  template: `
    <div class="spinner-container" *ngIf="spinnerActive">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      background-color: rgba(0,0,0, 0.1);
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;

      display: flex;
      align-items: center;
      justify-content: center;

      z-index: 10000
    }
  `]
})
export class SpinnerComponent {

  spinnerActive: boolean = true;

  constructor(
    public spinnerHandler: SpinnerHandlerService,
    private cdr: ChangeDetectorRef
  ) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  showSpinner = (state: boolean): void => {
    // console.log('state', state);
    this.spinnerActive = state;
  };
}
