import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedCategory: string = "";

  constructor(
    private readonly ticketsService: TicketsService,
    private readonly router: Router,
  ) { }

  // getAllTickets:
  getAllTickets() {
    this.ticketsService.getAllTickets().subscribe(
      ({ data }) => {
        this.tickets = data.tickets.map((t: any) => ({ ...t, pasajero: t.pasajero.nombre}))
      },
      (err) => {
        Swal.fire("Error en la obtención de datos", err , "error");
      }
    )
  }

  // deleteTicket:
  async deleteTicket(ticketId: number) {
    const response = await Swal.fire({
      title: '¿Estás seguro de eliminar este pasaje?',
      text: "Esto no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'No'
    })

    if (!response.isConfirmed) return;

    this.ticketsService.deleteTicket(ticketId).subscribe(
      (_data) => {
        Swal.fire(
          'Eliminado',
          'Este pasaje fue eliminado',
          'success'
        )

        this.getAllTickets();
      },
      (err) => {
        Swal.fire("Error al eliminar", err , "error");
      }
    )
  }

  // updateTicket
  updateTicket(ticketId: number) {
    this.router.navigate(["tickets", ticketId])
  }

  // filterTickets
  filterTickets() {
    this.ticketsService.getAllTickets(this.selectedCategory).subscribe(
      ({ data }) => {
        this.tickets = data.tickets.map((t: any) => ({ ...t, pasajero: t.pasajero.nombre}))
      },
      (err) => {
        Swal.fire("Error en la obtención de datos", err , "error");
      }
    )
  }

  ngOnInit(): void {
    this.getAllTickets();
  }

}
