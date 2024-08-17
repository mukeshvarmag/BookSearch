import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  bookId: number = 0;
  bookName: string = '';
  author: string = '';
  books: Book[] = [];
  book: Book = {
    bookid: 0,
    bookname: '',
    author: '',
    price: 0,
    worthy: ''
  };

  constructor(private bookService: BookService) {}

  searchById(): void {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.books = book ? [book] : [];
        this.resetSearchFields(); // Reset search fields after search
      });
    }
  }

  searchByName(): void {
    if (this.bookName) {
      this.bookService.getBookByName(this.bookName).subscribe((books) => {
        this.books = books;
        this.resetSearchFields(); // Reset search fields after search
      });
    }
  }

  searchByAuthor(): void {
    if (this.author) {
      this.bookService.getBookByAuthor(this.author).subscribe((books) => {
        this.books = books;
        this.resetSearchFields(); // Reset search fields after search
      });
    }
  }

  saveBook(): void {
    this.bookService.saveBook(this.book).subscribe(
      (bookId) => {
        console.log('Book saved successfully with ID:', bookId);
        this.resetSaveFields(); // Reset save form after saving
      },
      (error) => {
        console.error('Error saving the book:', error);
      }
    );
  }

  selectedBook: Book | null = null;

  selectBook(book: Book): void {
    this.selectedBook = { ...book }; // Clone the selected book to avoid direct mutations
  }
  
  update(): void {
    if (this.selectedBook) {
      this.bookService.updateBook(this.selectedBook).subscribe(
        (response) => {
          console.log('Book updated successfully:', response);
          this.selectedBook = null; // Clear selection after update
        },
        (error) => {
          console.error('Error updating the book:', error);
        }
      );
    }
  }

  // Method to reset search fields
  resetSearchFields(): void {
    this.bookId = 0;
    this.bookName = '';
    this.author = '';
  }

  // Method to reset save form fields
  resetSaveFields(): void {
    this.book = {
      bookid: 0,
      bookname: '',
      author: '',
      price: 0,
      worthy: ''
    };
  }
}
