import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnitComponent } from './unit/unit.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import {UnitService} from "./services/unit.service";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {Ng5SliderModule} from "ng5-slider";
import {unitReducer} from "./unit/state/unit.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    UnitComponent,
    UnitDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng5SliderModule,
    StoreModule.forRoot({unit: unitReducer})
  ],
  providers: [UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
