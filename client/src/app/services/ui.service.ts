import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../Book';
import { BookBlurbComponent } from '../components/book-blurb/book-blurb.component';

@Injectable({
  providedIn: 'root'
})

export class UiService {

  // For add book form UI
  private showAddBookSubject = new Subject<boolean>();
  private subject = new Subject<any>();

  // For edit book form UI
  // private editSubject = new Subject<Book>();
  private bookToEdit: Book = {
    id: 0,
    name: "",
    author: "",
    ratings: 0,
    price: 0,
    numberOfPages: 0,
    blurb: ""
  }; 
  
  // For UI changes based on Logged In or not
  private authSubject = new Subject<any>();

  constructor() { }

  // For add book form UI
  // toggleAddBook(): void {
  //   this.showAddBook = !this.showAddBook;
  //   this.subject.next(this.showAddBook);
  // }

  // Whether to show add or edit book
  setShowAddBook(addBook: boolean): void {
    this.showAddBookSubject.next(addBook);
  }

  setBookToEdit(book: Book) {
    this.bookToEdit = book;
  }

  getBookToEdit(): Book {
    return this.bookToEdit;
  }

  onFormToBeShown(): Observable<any> {
    return this.showAddBookSubject;
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  // For edit book form UI
  // toggleEditBook(book?: Book): void {
  //   if(book) {
  //     // means called from book-list
  //     // so open the book
  //     this.editSubject.next(book);
  //   } else {
  //     // called from clicking close on form
  //     this.editSubject.next(undefined);
  //   }
  // }
  
  // onEditToggle(): Observable<any> {
  //   return this.editSubject.asObservable();
  // }

  // For UI changes based on Logged In or not
  toggleLoginStatus(isLoggedIn: boolean, role: string): void {
    this.authSubject.next({
      isLoggedIn,
      role
    })
  }

  onLoginToggle(): Observable<any> {
    return this.authSubject.asObservable();
  } 
}
