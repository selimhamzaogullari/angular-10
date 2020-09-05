import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {
  subStore;
  unit = null;

  constructor(private store: Store<any>, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subStore = this.store.select('unit').subscribe(x => {
      /*this.activeRoute.params.subscribe(p => {
        console.log(p.id);
      })*/
      this.unit = x;
    })
  }

}
