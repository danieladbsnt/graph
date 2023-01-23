import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {
public chart: any;
countries: string[] = [];
cases: string[] = [];

  constructor(private service: ServicesService) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.service.getDataFiltered().subscribe((resp) => {
      resp.forEach(({continent, cases}: any) => {
        this.countries.push(continent)
        this.cases.push(cases)
      })
    })
  }

ngAfterViewInit(): void {
  this.createChart();
}

  createChart(){
    this.chart = new Chart("MyLineChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.countries, 
	       datasets: [
          {
            label: "Contagios",
            data: this.cases,
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}