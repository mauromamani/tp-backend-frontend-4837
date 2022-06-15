import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly baseUrl: string = "http://localhost:3000/api/v1/people"

  constructor(private readonly _http: HttpClient) { }

  // getAllPeople:
  getAllPeople(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }

    return this._http.get(`${this.baseUrl}`, httpOptions);
  }
}
