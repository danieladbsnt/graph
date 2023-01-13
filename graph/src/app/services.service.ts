import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { Covid } from './interfaces/covid';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
data: any;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com',
    'X-RapidAPI-Key': '573c47378amshbab078a7752d8fep197e84jsnaefcb30ed498'
  });
  
  getData(): Observable<Covid> {
    return this.http.get<Covid>('https://covid-19-tracking.p.rapidapi.com/v1', {
      headers: this.headers
    })
  }

  // getDataStatistics(): Observable<any> {
  //   return this.http.get<any>('https://covid-193.p.rapidapi.com/statistics', {
  //     headers: this.headers
  //   })
  // }

getDataFiltered() {
  return this.getData().pipe(
    switchMap((data:any) => {
      return [
        data
        .map(({Country_text, Total_Cases_text}:any) => ({
          Country_text,
          Total_Cases_text
        }))
      ]
    })
  )
}

}
