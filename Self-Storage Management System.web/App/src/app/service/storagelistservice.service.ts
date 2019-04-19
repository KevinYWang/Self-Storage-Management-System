import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageItem } from '../models/StorageItem';
import { first } from 'rxjs/operators';
import { Globals } from '../globals';
import { forEach } from '@angular/router/src/utils/collection';


@Injectable({
  providedIn: 'root'
})
export class StoragelistserviceService {
  myStorageList: StorageItem[] = [];

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) {

  }


  AddNewStorage(itemValue: any) {
    return this.http.post(`${this.globals.apiUrl}/home/addStorage`, itemValue);

  }

  getAll() {

//    if (this.myStorageList.length == 0) {
//      let endDate: Date = new Date();
//      let startDate: Date = new Date(endDate.setDate(endDate.getDate() - 2));
//
//      let tempStorageList: StorageItem[] = [{
//        id: 1, itemName: 'item one', fromDate: startDate, toDate: null, accountId:null
//      },
//      {
//        id: 2, itemName: 'item Two', fromDate: startDate, toDate: null, accountId: null
//      }];

      return  this.http.get<StorageItem[]>(`${this.globals.apiUrl}/storage/getall`); 
  }


  update(items: StorageItem[]): StorageItem[] {
    // return this.http.post(`${this.globals.apiUrl}/home/update`, items);
    let updatedItems: StorageItem[] = [];
    items.forEach(itemValue => {
      let toUpdateItem = this.myStorageList.find(x => x.id == itemValue.id);
      if (toUpdateItem == null) {
        alert("No such an item to update!");
      } else {
        toUpdateItem.toDate = new Date();
        updatedItems.push(toUpdateItem);
      }
    });

    return updatedItems;
  }

}
