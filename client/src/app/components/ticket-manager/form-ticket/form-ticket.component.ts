import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Ticket } from 'src/app/models/ticket';
import { PeopleService } from 'src/app/services/people.service';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css']
})
export class FormTicketComponent implements OnInit {
  ticket: Ticket = new Ticket();
  passengers: Person[] = [];
  action: string = "update"
  finalPrice!: number;

  constructor(
    private readonly peopleService: PeopleService,
    private readonly ticketsService: TicketsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.ticket.categoriaPasajero = 'A';
  }

  // loadPassengers:
  loadPassengers() {
    this.peopleService.getAllPeople().subscribe(
      ({ data }) => {
        this.passengers = data.people;
      },
      (err) => {
        Swal.fire("Error en la obtención de datos", err , "error");
      }
    )
  }

  // loadTicket:
  loadTicket(ticketId: number) {
    this.ticketsService.getTicketById(ticketId).subscribe(
      ({ data }) => {
        this.ticket = data.ticket

        const categoria = this.ticket.categoriaPasajero;
        const precio = this.ticket.precioPasaje;
      
        if (categoria === "M") {
          this.ticket.precioPasaje = precio + (precio / 3);
        } else if (categoria === "J") {
          this.ticket.precioPasaje = precio + precio;
        } 

        this.calcFinalPrice();
      },
      (err) => {
        console.log(err);
        Swal.fire("Error en la obtención de datos", "", "error");
        this.router.navigate(["tickets"])
      }
    )
  }

  // calcFinalPrice:
  calcFinalPrice() {
    const categoria = this.ticket.categoriaPasajero;
    const precio = this.ticket.precioPasaje;
  
    if (categoria === "M") {
      this.finalPrice = precio - (precio * 0.25);
    } else if (categoria === "J") {
      this.finalPrice = precio - (precio * 0.50);
    } else {
      this.finalPrice = precio;
    }
  }

  // createTicket:
  saveTicket(_e: any, form: NgForm) {
    this.ticket.precioPasaje = this.finalPrice;
    this.ticket.fechaCompra = Date.now().toString();

    // Update ticket
    if (this.action === "update") {
      this.updateTicket();
      return;
    }

    this.ticketsService.createTicket(this.ticket).subscribe(
      ({ data }) => {
        console.log(data);
        Swal.fire("Pasaje creado con éxito", "", "success");
        form.reset();
      },
      (err) => {
        console.log(err);
        Swal.fire("Error en la obtención de datos", err , "error");
      }
    )
  }

  // updateTicket:
  updateTicket() {
    this.ticketsService.updateTicket(this.ticket).subscribe(
      ({ data }) => {
        Swal.fire("Pasaje modificado con éxito", "", "success");
      },
      (err) => {
        console.log(err);
        Swal.fire("Error en la obtención de datos", err , "error");
      }
    )
  }

  ngOnInit(): void {
    this.loadPassengers();
    this.activatedRoute.params.subscribe(p => p["id"] === "new" ? this.action = "new" : this.loadTicket(p["id"]))
  }
}
