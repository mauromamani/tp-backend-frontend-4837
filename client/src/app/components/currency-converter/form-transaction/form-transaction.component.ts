import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.css']
})
export class FormTransactionComponent implements OnInit {
  fromC: string = "USD";
  to: string = "ARS";
  email: string = "";
  qty: number = 0;
  conversion: number = 0;
  message: string = "";

  constructor(private readonly transactionService: TransactionService, private readonly router: Router) { }

  // createTransaction
  createTransaction() {
    if (!this.email.trim() || !this.fromC.trim() || !this.to.trim()) {
      this.message = "Los campos no deben estar vacios"
      return 
    }

    const newTransaction = new Transaction();
    newTransaction.emailCliente = this.email;
    newTransaction.monedaOrigen = this.fromC;
    newTransaction.cantidadOrigen = this.qty;
    newTransaction.monedaDestino = this.to;
    newTransaction.cantidadDestino = 0;
    newTransaction.tasaConversion = this.conversion;

    this.transactionService.createTransaction(newTransaction).subscribe(
      (_data) => {
        Swal.fire("Transaccion creada", "La transaccion fue creada con éxito", "success");
      },
      (err) => {
        Swal.fire("Error en la creacion", err , "error");
      }
    )
  }

  // transactionsHistory
  goTransactionsHistory() {
    this.router.navigate(["transactions"])
  }

  ngOnInit(): void {
  }

}
