import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly baseUrl: string = "http://localhost:3000/api/v1/tickets"

  constructor(private readonly _http: HttpClient) { }

  // createTicket:
  createTicket(newTicket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.post(this.baseUrl, newTicket, httpOptions);
  }

  // updateTicket:
  updateTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.put(`${this.baseUrl}/${ticket._id}`, ticket, httpOptions);
  }

  // getAllTickets:
  getAllTickets(category: string = ""): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.get(`${this.baseUrl}?categoria=${category}`, httpOptions);
  }

  // getTicketById:
  getTicketById(ticketId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.get(`${this.baseUrl}/${ticketId}`, httpOptions);
  }

  // deleteTicket:
  deleteTicket(ticketId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http.delete(`${this.baseUrl}/${ticketId}`, httpOptions);
  }
}
