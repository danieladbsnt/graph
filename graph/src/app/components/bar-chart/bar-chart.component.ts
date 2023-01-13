import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart, LogarithmicScale, registerables} from 'chart.js';
import { Covid } from 'src/app/interfaces/covid';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
public chart: any;
info = [''];
cases = [''];

  constructor(private service: ServicesService) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    
    // this.service.getDataStatistics().subscribe(
    //   data => console.log(this.info = data.response)
    // )
    this.service.getDataFiltered().subscribe((resp) => {
      console.log(resp)
      // resp.map(({Country_text, Total_Cases_text}:any) => {
      //   this.info.push(Country_text);
      //   this.cases.push(Total_Cases_text)
        
      // })
      
      
//       resp.forEach(({Country_text, Total_Cases_text}: any) => {
// //SE METEN LOS PAÍSES
//         this.info.push(Country_text);
//         console.log(this.info);
        
// //POR QUÉ ES UNDEFINEEEEEEEDDDDDDDDDDDDD
//         this.cases.push(Total_Cases_text)
//       })
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.createChart();
  }
  createChart(){
  
    this.chart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.info, 
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

test() {
  console.log(this.info)
}


}
