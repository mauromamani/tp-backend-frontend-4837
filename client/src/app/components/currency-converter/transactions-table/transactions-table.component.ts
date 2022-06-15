import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {
  transactions: Transaction[] = [];
  filter = {
    origen: "",
    destino: ""
  };

  constructor(private readonly transactionService: TransactionService) { }

  filterTransactions() {
    this.transactionService.getTransactions(this.filter.origen, this.filter.destino).subscribe(
      ({ data }) => {
        if (data.total_transactions === 0) {
          Swal.fire("No existen resultados para esa búsqueda", "", "info")
          return
        }

        this.transactions = data.transactions;
      },
      (err) => {
        Swal.fire("Error", err , "error");
      }
    )
  }

  ngOnInit(): void {
    this.transactionService.getTransactions(this.filter.origen, this.filter.destino).subscribe(
      ({ data }) => {
        this.transactions = data.transactions;
      },
      (err) => {
        Swal.fire("Error", err , "error");
      }
    )
  }
}
