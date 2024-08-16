import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent  {
  bookId: number = 0;
  bookName: string = '';
  author: string = '';
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  searchById(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.books = book ? [book] : [];
      });
    }
  }

  searchByName(): void {
    if (this.bookName) {
      this.bookService.getBookByName(this.bookName).subscribe((books) => {
        this.books = books;
      });
    }
  }

  searchByAuthor(): void {
    if (this.author) {
      this.bookService.getBookByAuthor(this.author).subscribe((books) => {
        this.books = books;
      });
    }
  }
  
  
}
