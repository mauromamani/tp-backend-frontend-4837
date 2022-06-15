import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  books: Book[] = [];
  indexImg: number = 0;
  currentBook: Book= {} as Book;

  constructor(private readonly booksService: BooksService, private readonly router: Router) {
  }

  // nextImg:
  nextImg() {
    if (this.indexImg == this.books.length - 1) {
      this.indexImg = 0;
    } else {
      this.indexImg++
    }
    this.currentBook = this.books[this.indexImg]
  }

  // prevImg:
  prevImg() {
    if (this.indexImg == 0 ) {
      this.indexImg = this.books.length - 1;
    } else {
      this.indexImg--
    }
    this.currentBook = this.books[this.indexImg]
  }

  // getBooks
  getBooks() {
    this.booksService.getBooksByDestacado().subscribe(
      ({ data }) => {
        (data.books as Book[]).forEach((book) => {
          this.books.push(book)
        });

        this.currentBook = this.books[0];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // newBook
  newBook() {
    this.router.navigate(["books", "new"])
  }

  ngOnInit(): void {
    this.getBooks();
  }

}
