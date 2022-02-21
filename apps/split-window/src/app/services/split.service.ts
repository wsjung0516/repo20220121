import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Store} from "@ngxs/store";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {StatusState} from "../../state/status/status.state";

@Injectable({
  providedIn: 'root'
})
export class SplitService {
  bWorker: any = undefined;

  elements: any[] = ['element1', 'element2', 'element3', 'element4']
  selectedElement: any = this.elements[0];
  /** Each category has image id, which is changed by clicking thumbnail item and by
   * clicking previous arrow key  and next arrow key */
  currentImageIndex: {[key:string]: number} = {};
  imageCount: {[key:string]:number} = {};
  progress: {[key:string]:number} = {};

  isFinishedRendering: {[key:string]: Subject<any>} = {};
  isFinishedRendering$: {[key:string]: Observable<any>} = {};
  isStartedRendering: {[key:string]: Subject<any>} = {};
  isStartedRendering$: {[key:string]: Observable<any>} = {};
  //
  @SelectSnapshot(StatusState.getCategoryList) category_list:string[];

  constructor(private store: Store) { }
  resetSplitWindowProcessing() {
    this.category_list.map( val => this.currentImageIndex[val] = 0 )
    this.elements.map( val => {
      this.isFinishedRendering[val] = new Subject();
      this.isFinishedRendering$[val] = this.isFinishedRendering[val].asObservable();
      this.isStartedRendering[val] = new Subject();
      this.isStartedRendering$[val] = this.isStartedRendering[val].asObservable();
    });
  }
}
