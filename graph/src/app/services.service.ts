import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, switchMap, map, filter } from 'rxjs';
import { Covid } from './interfaces/covid';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
cases!: number;
countries!: string;

  constructor(private http: HttpClient) { }
  
  getData(): Observable<Covid> {
    return this.http.get<Covid>('https://disease.sh/v3/covid-19/continents')
  }

  getDataFiltered() {
    return this.getData().pipe(
      switchMap((data: any) => {
        return [
          data.map(({continent, cases}: any) => ({
            continent,
            cases,
          }))
          .filter((data: any) => !!data.cases)
        ]
      })
    )
  }

}
