import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UnitService {

    constructor(private http: HttpClient) { }

    getAllUnits = () => this.http.get('http://localhost:3000/units');
}
