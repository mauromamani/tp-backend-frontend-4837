import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/books/form/form.component';
import { SliderComponent } from './components/books/slider/slider.component';
import { FormTransactionComponent } from './components/currency-converter/form-transaction/form-transaction.component';
import { TransactionsTableComponent } from './components/currency-converter/transactions-table/transactions-table.component';
import { FormTicketComponent } from './components/ticket-manager/form-ticket/form-ticket.component';
import { TicketTableComponent } from './components/ticket-manager/ticket-table/ticket-table.component';

const routes: Routes = [
  { path: 'books', component: SliderComponent },
  { path: 'books/new', component: FormComponent},
  { path: 'transactions/new', component: FormTransactionComponent},
  { path: 'transactions', component: TransactionsTableComponent},
  { path: 'tickets/:id', component: FormTicketComponent},
  { path: 'tickets', component: TicketTableComponent},
  { path: "**", redirectTo:"/books", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
