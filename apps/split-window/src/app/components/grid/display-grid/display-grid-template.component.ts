import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {GridTemplateComponent} from "../grid-template/grid-template.component";

@Component({
  selector: 'display-grid-template',
  template: `
    <div >
      <ng-container  [ngTemplateOutlet]="onGetTemplate(_templateName)"
                     [ngTemplateOutletContext]="{height:_templateHeight,
                                    selectedTemplate:_selectedTemplate}"
      ></ng-container>
    </div>
    <app-grid-template #gridTemplate ></app-grid-template>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayGridTemplateComponent {
  @Input() set templateName (v: string) {
    this._templateName = v;
    this.cdr.detectChanges();
  };
  @Input() set templateHeight(v: string) {
    this._templateHeight = v;
    this.cdr.detectChanges();
  };
  @Input() set selectedTemplate(v: string) {
    this._selectedTemplate = v;
    this.cdr.detectChanges();
  };
  _templateName: string;
  _templateHeight: string;
  _selectedTemplate: string;
  @ViewChild('gridTemplate', { static: true }) gridTemplate?: GridTemplateComponent;
  constructor(private cdr: ChangeDetectorRef) {
  }
  onGetTemplate(name: string) {
    return  this.gridTemplate?.getTemplate(name);
  }
}
