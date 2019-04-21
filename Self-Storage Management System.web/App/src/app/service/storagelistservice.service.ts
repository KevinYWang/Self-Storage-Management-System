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
    return this.http.post(`${this.globals.apiUrl}/storage/add`, itemValue);
  }

  getAll() {
    return this.http.get(`${this.globals.apiUrl}/storage/getall`);
  }


  update(items: StorageItem[]) {
    return this.http.post(`${this.globals.apiUrl}/storage/update`, items);
  }

}
