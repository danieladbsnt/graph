import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit {
public chart: any;

  constructor(private service: ServicesService) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    
  }

ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.createChart();
}

  createChart(){
  
    this.chart = new Chart("MyLineChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
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
