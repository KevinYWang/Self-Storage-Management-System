
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  apiUrl: string = "https://localhost:4200";

  constructor(private http: HttpClient) {
  }


  getAll() {
    return this.http.get<Account[]>(`${this.apiUrl}/account`);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/account/` + id);
  }

  register(user: Account) {
    return this.http.post(`${this.apiUrl}/account/register`, user);
  }

  update(user: Account) {
    return this.http.put(`${this.apiUrl}/account/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/account/` + id);
  }
}
