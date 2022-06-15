import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/books/slider/slider.component';
import { FormComponent } from './components/books/form/form.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormTransactionComponent } from './components/currency-converter/form-transaction/form-transaction.component';
import { TransactionsTableComponent } from './components/currency-converter/transactions-table/transactions-table.component';
import { FormTicketComponent } from './components/ticket-manager/form-ticket/form-ticket.component';
import { TicketTableComponent } from './components/ticket-manager/ticket-table/ticket-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    FormComponent,
    NavbarComponent,
    FooterComponent,
    FormTransactionComponent,
    TransactionsTableComponent,
    FormTicketComponent,
    TicketTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
