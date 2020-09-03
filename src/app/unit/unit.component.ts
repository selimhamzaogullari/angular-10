import { Component, OnInit } from '@angular/core';
import {UnitService} from '../services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  objectKeys = Object.keys;
  units = null;
  agesArr = ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'];
  activeAges = 'All';

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(res => {
      this.units = res;
      console.log(res[1]);
    });
  }

}
