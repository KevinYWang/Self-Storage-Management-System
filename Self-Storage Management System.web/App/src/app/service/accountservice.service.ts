
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/Account';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  apiUrl: string = "https://localhost:4200";

  constructor(private http: HttpClient,
    private globals: Globals) {
  }


  getAll() {
    return this.http.get<Account[]>(`${this.globals.apiUrl}/account`);
  }

  getById(id: number) {
    return this.http.get(`${this.globals.apiUrl}/account/` + id);
  }

  register(user: Account) {
    return this.http.post(`${this.globals.apiUrl}/account/register`, user);
  }

  update(user: Account) {
    return this.http.put(`${this.globals.apiUrl}/account/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.globals.apiUrl}/account/` + id);
  }
}
