
import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { StoragelistserviceService } from '../service/storagelistservice.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../service';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-storagelist',
  templateUrl: './storagelist.component.html',
  styleUrls: ['./storagelist.component.css']
})
export class StoragelistComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  loadingNewStorage: boolean = false;
  rowData: any;
  //Highcharts.ChartObject;
  chart: any;
  newStorageForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private storagelistserviceService: StoragelistserviceService,
    private alertService: AlertService) {

  }

  columnDefs = [
    { headerName: "ID", field: "id", hide: true, suppressToolPanel: true },
    { headerName: 'Item Description', field: 'itemName', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'From', field: 'fromDate', sortable: true, filter: true },
    { headerName: 'To', field: 'toDate', sortable: true, filter: true }

  ];


  ngOnInit() {
    let endDate: Date = new Date();
    let startDate: Date = new Date(endDate.setDate(endDate.getDate() - 2));

    this.rowData = [{
      id: 1, itemName: 'item one', fromDate: startDate.toDateString(), toDate: endDate.toDateString()
    },
    {
      id: 2, itemName: 'item Two', fromDate: startDate.toDateString(), toDate: endDate.toDateString()
    }];


    this.newStorageForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      fromDate: ['', Validators.required]
    });
  }
  get f() { return this.newStorageForm.controls; }

  Checkout() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length < 1) {
      alert(`Please select the items you need to check out.`);
    }
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.itemName).join(', ');
    alert(`Check out item: ${selectedDataStringPresentation}`);
  }

  TurnOnAddingNewStorage() {
    this.loadingNewStorage = true;
  }
  CancelAdding() {
    this.loadingNewStorage = false;
  }


  onAddNewStorageSubmit() {
    this.submitted = true;

    if (this.newStorageForm.invalid) {
      return;
    }

    this.loading = true;
    this.storagelistserviceService.AddNewStorage(this.newStorageForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}









// ngAfterViewInit() {
//   const options: Highcharts.Options = {
//     chart: {
//       type: 'line'
//     },
//     title: {
//       text: 'Fruit Consumption'
//     },
//     xAxis: {
//       categories: ['Apples', 'Bananas', 'Oranges']
//     },
//     yAxis: {
//       title: {
//         text: 'Fruit eaten'
//       }
//     },
//     series: [{
//       name: 'Jane',
//       data: [1, 0, 4]
//     } as Highcharts.SeriesColumnOptions,
//     {
//       name: 'John',
//       data: [5, 7, 3]
//     } as Highcharts.SeriesColumnOptions]
//   };

//   // this.chart = chart(this.chartTarget.nativeElement, options);
// }
// addSeries() {
//   let names: string[]
//     = ['Tom', 'Elisabeth', 'Sue', 'Penny', 'Marvel', 'Judy', 'Selina', 'Cindy']
//   let nameOption: number = Math.floor(Math.random() * Math.floor(8));
//   let name: string = names[nameOption];

//   this.chart.addSeries({
//     name: name,
//     data: [nameOption * Math.random(), nameOption * Math.random(), nameOption * Math.random()]
//   })
// }
// }
