import {Directive, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[selectColor]'
})
export class SelectColorDirective implements  OnChanges{
  @Input('selectColor') sTemplate?: string;
  @Input() selectedTemplate?:string;
  @Output() selectTemplate = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedTemplate'].currentValue === this.sTemplate) {
      this.border = '3px solid red';
      //console.log('- wsjung SelectColorDirective-- changes', changes, changes.selectedTemplate.currentValue)
    } else {
      this.border = '2px solid gray';
    }
  }

  @HostBinding('style.border') border?: string;
  @HostBinding('style.zIndex') zIndex?: number;
  @HostListener('mouseover') onMouseOver() {
    if( this.selectedTemplate !== this.sTemplate) {
      this.border = '3px solid blue';
    }
  }
  @HostListener('click') onClick() {
    this.border = '3px solid red';
    this.selectTemplate.emit(this.sTemplate);
  }
  @HostListener('mouseleave') onMouseLeave() {
    if( this.selectedTemplate !== this.sTemplate) {
      this.border = '2px solid gray';
    }
  }
}
