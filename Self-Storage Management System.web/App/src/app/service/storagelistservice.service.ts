import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageItem } from '../models/StorageItem';


@Injectable({
  providedIn: 'root'
})
export class StoragelistserviceService {
  apiUrl: string = "https://localhost:4200";

  constructor(private http: HttpClient) {
  }


  AddNewStorage(itemValue: any) {
    return this.http.post(`${this.apiUrl}/storage/addStorage`, itemValue);

  }

  getAll(accountId: number) {
    return this.http.get<StorageItem[]>(`${this.apiUrl}/storage/getall`);
  }


  update(itemValue: any) {
    return this.http.post(`${this.apiUrl}/storage/update`, itemValue);
  }

}
