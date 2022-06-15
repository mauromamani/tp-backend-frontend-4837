import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  book: Book = {destacado: true} as Book;

  constructor(private readonly booksService: BooksService) { }

  // createbook
  createBook(event: any, form: NgForm) {
    this.booksService.createBook(this.book).subscribe(
      (_data) => {
        Swal.fire("Libro creado", "El libro fue creado con éxito", "success")
        form.reset();
      },
      (err) => {
        Swal.fire("Error en la creacion", err , "error")
      }
    )
  }

  ngOnInit(): void {
  }

}
