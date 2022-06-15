import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly baseUrl: string = "http://localhost:3000/api/v1/books"

  constructor(private readonly _http: HttpClient) { }

  // getBooksByDestacado:
  getBooksByDestacado(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }

    return this._http.get(`${this.baseUrl}?destacado=true`, httpOptions);
  }

  // createBook
  createBook(book: Book): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }

    return this._http.post(this.baseUrl, book, httpOptions);
  }
}
