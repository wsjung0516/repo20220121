import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {concatMap, map, takeUntil, toArray} from "rxjs/operators";
import {from, Observable, Subject} from "rxjs";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {StatusState} from "../../../state/status/status.state";

@Injectable({
  providedIn: 'root'
})
export class SeriesItemService implements OnDestroy{
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  @SelectSnapshot(StatusState.getCategoryList) category_list: string[] | undefined;
  constructor(private http: HttpClient) { }

  getSeriesObject(): Observable<any[]> {
     const url_base = 'assets/json/';
     // @ts-ignore
    return from( this.category_list).pipe(
       takeUntil(this.unsubscribe$),
       map( cat => `${url_base}${cat}.json`),
       concatMap( url => this.http.get(url)),
       map( (dat: any, index) => {
         // @ts-ignore
         return {
           url: dat.data[0].url,
           seriesId: index + 1,
           blob: '',
           category: this.category_list[index]
         }
       }),
       toArray()
     )
  }
  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
