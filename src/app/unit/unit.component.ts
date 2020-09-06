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
  _units = null;
  agesArr = ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'];
  activeAges = 'All';
  readOnly = false;
  query = {
    wood: {
      max: 200,
      min: 0
    },
    food: {
      max: 200,
      min: 0
    },
    gold: {
      max: 200,
      min: 0
    }
  }

  options: Options = {
    floor: 0,
    ceil: 200,
    readOnly: true
  };

  woodProp = {
    value: 0,
    maxValue: 200,
    active: false,
    options: this.options
  }
  foodProp = {
    value: 0,
    maxValue: 200,
    active: false,
    options: this.options
  }

  goldProp = {
    value: 0,
    maxValue: 200,
    active: false,
    options: this.options
  }

  serviceWork;

  constructor(
      private unitService: UnitService,
      private router: Router,
      private store: Store<any>) { }

  ngOnInit(): void {
    this.serviceWork = this.unitService.getAllUnits().subscribe(res => {
      this.units = res;
      this._units = JSON.parse(JSON.stringify(this.units));
    });
  }

  goDetailPage (unit) {
    this.store.dispatch(selectedUnit({data: unit}));
    this.router.navigate(['unit-detail/', unit.id]).then(r => {
      if(!r) console.log('Wrong');
    })
  }

  ngOnDestroy() {
    this.serviceWork.unsubscribe();
  }
  // Cost min value change
  sliderValueChange(v, cN) {
    const cost = cN === 'wood' ? this.woodProp : (cN === 'food' ? this.foodProp : this.goldProp);
    this.query[cN].min = cost.value;
    setTimeout(()=> {
      this.filteringData();
    }, 1);
  }
  // Cost max value change
  sliderMaxValueChange(v, cN) {
    const cost = cN === 'wood' ? this.woodProp : (cN === 'food' ? this.foodProp : this.goldProp);
    this.query[cN].max = cost.maxValue;
  }
  // Filter query
  filteringData() {
    this._units = this.units.filter(o => {
      // Costs Filter
      if(this.woodProp.active && (o.cost?.Wood < this.query['wood'].min || o.cost?.Wood > this.query['wood'].max || !o.cost?.hasOwnProperty('Wood'))) {
        return false;
      }
      if(this.foodProp.active && (o.cost?.Food < this.query['food'].min || o.cost?.Food > this.query['food'].max || !o.cost?.hasOwnProperty('Food'))) {
        return false;
      }
      if(this.goldProp.active && (o.cost?.Gold < this.query['gold'].min || o.cost?.Gold > this.query['gold'].max || !o.cost?.hasOwnProperty('Gold'))) {
        return false;
      }
      if(this.activeAges !== 'All' && this.activeAges !== o.age) {
        return false;
      }
      // Ages Filter
      return true;
    });
  }
  // Cost checkbox change
  onChangeEnable (cN) {
    const cost = cN === 'wood' ? this.woodProp : (cN === 'food' ? this.foodProp : this.goldProp);
    cost.options = Object.assign({}, cost.options, {readOnly: !cost.active});
    this.filteringData();
  }
  // Age Change
  changeAges(name) {
    this.activeAges = name;
    this.filteringData();
  }

}
