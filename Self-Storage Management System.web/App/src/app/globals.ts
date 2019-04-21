import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  loading: boolean = false;
  apiUrl: string = "https://localhost:44389";
}
