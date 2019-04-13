import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('chartTarget') chartTarget: ElementRef;

  title = 'Self-storage Management System';

  rowData: any;
  chart: any;//Highcharts.ChartObject;

  columnDefs = [
    { headerName: 'make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'model', field: 'model', sortable: true, filter: true },
    { headerName: 'price', field: 'price', sortable: true, filter: true }
  ];


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }


  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  ngAfterViewInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      } as Highcharts.SeriesColumnOptions,
      {
        name: 'John',
        data: [5, 7, 3]
      } as Highcharts.SeriesColumnOptions]
    };

    this.chart = chart(this.chartTarget.nativeElement, options);
  }
  addSeries() {
    let names: string[]
      = ['Tom', 'Elisabeth', 'Sue', 'Penny', 'Marvel', 'Judy', 'Selina', 'Cindy']
    let nameOption: number = Math.floor(Math.random() * Math.floor(8));
    let name: string = names[nameOption];

    this.chart.addSeries({
      name: name,
      data: [nameOption*Math.random() , nameOption* Math.random(), nameOption*Math.random()]
    })
  }
}
