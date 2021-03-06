
import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { StoragelistserviceService } from '../service/storagelistservice.service';
import { StorageItem } from '../models/StorageItem';
import { Globals } from '../globals';
import { chart } from 'highcharts';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-storagelist',
  templateUrl: './storagelist.component.html',
  styleUrls: ['./storagelist.component.css']
})
export class StoragelistComponent implements OnInit {
  @ViewChild('agGrid')
  agGrid: AgGridNg2;
  @ViewChild('chartTarget')
  chartTarget: ElementRef;
  @ViewChild('addNewStorageModal')
  myModal: ElementRef;
  rowData: any;
  // Highcharts.ChartObject;
  chart: any;
  newStorageForm: FormGroup;
  submitted = false;
  loadingNewStorage = false;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private storagelistserviceService: StoragelistserviceService,
    private globals: Globals
  ) {

  }

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true, suppressToolPanel: true },
    { headerName: 'Item Description', field: 'itemName', sortable: true, filter: true, checkboxSelection: true },
    {
      headerName: 'From',
      field: 'fromDate',
      sortable: true,
      filter: true,
      cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toDateString() : '';
      }
    },
    {
      headerName: 'To',
      field: 'toDate',
      sortable: true,
      filter: true,
      cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toDateString() : '';
      }
    }
  ];


  ngOnInit() {
    this.globals.loading = false;
    this.rowData = this.getStorageList();
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
      return;
    }
    let selectedData: StorageItem[] = selectedNodes.map(node => node.data);
    
    //update checkout dates
    selectedData.forEach(x => {
      x.toDate = new Date();
    });

    //update at the back end; 
    this.globals.loading = true;
    this.storagelistserviceService.update(selectedData)
      .pipe(first())
      .subscribe(
        (data: StorageItem[]) => {
          if (data.length > 0) {
            data.forEach(tempItem => {
              let changedItem: StorageItem = this.rowData.find((x: { id: number; }) => x.id === tempItem.id);

              changedItem.itemName = tempItem.itemName;
              changedItem.fromDate = tempItem.fromDate;
              changedItem.toDate = tempItem.toDate;
            });
          }

          this.agGrid.api.redrawRows();
        },
        error => {
          alert(error);
        });
    this.globals.loading = false;;


    this.agGrid.api.redrawRows();
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
    let self = this; 
    this.globals.loading = true;
    this.storagelistserviceService.AddNewStorage(this.newStorageForm.value)
      .pipe(first())
      .subscribe(
        (data: StorageItem) => {
          self.rowData.push(data);
          self.agGrid.api.redrawRows();
          self.agGrid.api.refreshCells();
          this.loadingNewStorage = false;
        },
        error => {
          alert(error);
        });
    this.globals.loading = false;

  }


  getStorageList() {
    this.globals.loading = true;
    this.storagelistserviceService.getAll()
      .pipe(first())
      .subscribe(
        (data: StorageItem[]) => {
          this.rowData = data;
          this.agGrid.api.redrawRows();
        },
        error => { 
          alert(error);
        });

    this.globals.loading = false;
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
