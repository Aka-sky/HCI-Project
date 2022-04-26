import { Component, OnInit } from '@angular/core';
import { Book } from "../../Book";
import { BookService } from "../../services/book.service"
import { AlertService } from '../../services/alert.service';
import { UiService } from 'src/app/services/ui.service';
import { faPen, faTrash, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
// import { BOOKS } from "../../mock-books";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  fetchedBooks: Book[] = [];
  books: Book[] = [];
  faPen = faPen;
  faTrash = faTrash;
  isLibrarian: boolean = false;
  search!: string;

  // For sort button
  hasArrow = false;
  faArrow = faArrowUp;
  sortButtonText = "Sorted by ID";

  constructor(private router: Router, private uiService: UiService, private bookService: BookService, private alertService: AlertService) {
    let val = localStorage.getItem("isLoggedIn");
    if(val) {
      this.isLibrarian = localStorage.getItem("role") == "librarian" ? true : false;
    }
  }
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.fetchedBooks = books;
      this.books = books;
    });
  }

  searchBook(value: string) {
    this.books = this.fetchedBooks;
    if(value != "") {
      this.books = this.books.filter(book => {
        return book.name.toLowerCase().includes(value.toLowerCase())
      })
    }
  }

  editBook(book: Book) {
    this.uiService.setShowAddBook(false);
    this.uiService.setBookToEdit(book);
    this.router.navigate(["addBook"]);
  }

  deleteBook(book: Book) {
    if(confirm("Are you sure you want to delete this book?")) {
      this.bookService.deleteBook(book);
      this.books = this.books.filter((value) => value !== book);
      // Alert that book is deleted
      this.alertService.success("Book Deleted!!")
    }
  }

  changeSortOrder() {

    // Check if has arrow 
    if(this.hasArrow) {
      if(this.faArrow == faArrowUp) {
        this.faArrow = faArrowDown;
        // sort in descending order
        this.books = this.books.sort((a, b) => {
          return b.price - a.price;
        })
      } else {
        this.faArrow = faArrowUp;
        this.hasArrow = !this.hasArrow;
        // sort in id
        this.books = this.books.sort((a, b) => {
          return a.id! - b.id!;
        });
        this.sortButtonText = "Sorted by ID";
      }
    } else {
      // Sort in ascending order
      this.hasArrow = true;
      this.sortButtonText = "Sorted by Price";
      this.books = this.books.sort((a, b) => {
        return a.price - b.price;
      });
    }
  }
}
