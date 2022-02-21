import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {StatusState} from "../../../../../state/status/status.state";
import {CarouselService} from "../../../../services/carousel.service";
import {SetSelectedSplitWindowId, SetSplitAction} from "../../../../../state/status/status.actions";
import {SplitService} from "../../../../services/split.service";
import {Store} from "@ngxs/store";

@Component({
  selector: 'carousel-main-display',
  template: `
    <div class="m-1">
      <mat-progress-bar mode="determinate" [value]="_progress"></mat-progress-bar>
    </div>
    <div class="">
      <div class="m-1">
        <img class="object-scale-down" #img>
      </div>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselMainDisplayComponent {
  @Input() set progress (v: any) {
    // console.log('progress',v)
    this._progress = v.value
  }
  @Input() set img (v: any) {
    if(this.image) this.image.nativeElement.src = v;
  }
  @Input() splitIdx: number;
  @Input() category: string;

  @ViewChild('img') image: ElementRef;
  @SelectSnapshot(StatusState.getSplitMode) splitMode: number;
  @SelectSnapshot(StatusState.getSplitAction) splitAction: boolean;
  @SelectSnapshot(StatusState.getFocusedSplit) focusedSplitIdx: number;

  _progress: number;
  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
  }

  constructor(
    private carouselService: CarouselService,
    private splitService: SplitService,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) { }

  nextImage() {
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) return

    const image = this.carouselService.getNextImage(this.category, this.splitService.selectedElement);
    this.displaySplitWindowImage(image);
  }
  prevImage() {
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) return

    const image = this.carouselService.getPrevImage(this.category, this.splitService.selectedElement);
    this.displaySplitWindowImage(image);
  }
  private displaySplitWindowImage(image: any) {
    // console.log('-- displaySplitWindowImage -3 this.focusedSplitIdx, this.splitIdx, this.splitAction', this.focusedSplitIdx, this.splitIdx, this.splitAction)
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) {
      return
    }
    // this.image.nativeElement.src = image;
    this.image = image;
    this.cdr.detectChanges();
    /** To focus on the selected split window as the first window */
    this.store.dispatch(new SetSelectedSplitWindowId('element1'));

    /**
     * 1. In case, window is opened by split mode action,
     * 2. and user clicked arrow button,
     * 3. this time splitAction is true
     * 4. reset splitAction false when the last split window is displayed.
     * this can protect abnormal display
     * */
    if( this.splitAction === true ) {
      const splitIdx = this.splitService.elements.findIndex((val:any) => val === this.splitService.selectedElement)
      // console.log(' displaySplitWindowImage -4 splitIdx', splitIdx);
      if( this.splitMode -1  === splitIdx)
        this.store.dispatch(new SetSplitAction(false));
    }
  }
}
