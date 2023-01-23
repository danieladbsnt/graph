import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {
public chart: any;
countries: string[] = [];
cases: string[] = []

  constructor(private service: ServicesService) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.service.getDataFiltered().subscribe((resp)=> {
      resp.forEach(({continent, cases}:any) => {
        this.countries.push(continent)
        this.cases.push(cases)
      })
    })
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.countries, 
	       datasets: [
          {
            label: "Contagios",
            data: this.cases,
            backgroundColor: 'purple'
          },  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  } 
}