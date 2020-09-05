import {Component, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../services/unit.service';
import { Options } from 'ng5-slider';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectedUnit} from "./state/units.action";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  units = null;
  agesArr = ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'];
  activeAges = 'All';
  value: number = 0;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 200
  };

  serviceWork;
  subStore;
  unit;

  constructor(
      private unitService: UnitService,
      private router: Router,
      private store: Store<any>) { }

  ngOnInit(): void {
    this.serviceWork = this.unitService.getAllUnits().subscribe(res => {
      this.units = res;
    });
    this.subStore = this.store.select('unit').subscribe(x => {
      this.unit = x;
    })
  }

  goDetailPage (unit) {
    this.store.dispatch(selectedUnit({data: unit}));
    this.router.navigate(['unit-detail/', unit.id]).then(r => {
      if(!r) console.log('Wrong');
    })
  }

  ngOnDestroy() {
    this.serviceWork.unsubscribe();
    this.subStore.unsubscribe();
  }

}
