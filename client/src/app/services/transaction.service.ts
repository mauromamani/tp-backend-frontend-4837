import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly baseUrl: string = "http://localhost:3000/api/v1/transactions"

  constructor(private readonly _http: HttpClient) { }

  createTransaction(transaction: Transaction): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.post(this.baseUrl, transaction, httpOptions);
  }

  getTransactions(from: string, to: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.get(`${this.baseUrl}?origen=${from}&destino=${to}`, httpOptions);
  }
}
