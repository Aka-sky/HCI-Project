import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Book } from "../Book";
import { BOOKS } from "../mock-books";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  max_id: number = 10; 
  booksArray: Book[] = BOOKS;
  booksSubject = new BehaviorSubject<Book[]>(BOOKS);

  constructor() {
  }

  // getBooks(): Observable<Book[]> {
  //   return of(this.booksArray);
  // }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getBook(book_id: string): Book {
    return this.booksArray.find(({id}) => id === parseInt(book_id)) !;
    // return of(BOOKS[])
  }

  addBook(book: any) {
    this.max_id++;
    let newBook: Book = {
      id: this.max_id,
      ...book
    }
    
    this.booksArray.push(newBook);
    this.booksSubject.next(this.booksArray);
  }

  editBook(book: any, id?: number) {
    // Find the index of the book
    let index = this.booksArray.findIndex(value => value.id === id);
    // Change the book
    let newBook: Book = {
      id: id,
      ...book
    }
    this.booksArray[index] = newBook;
    this.booksSubject.next(this.booksArray);
  }

  deleteBook(book: Book) {
    this.booksArray = this.booksArray.filter((value) => value !== book);
    this.booksSubject.next(this.booksArray);
  }

}
