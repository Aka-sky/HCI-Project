import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UiService } from 'src/app/services/ui.service';
import { Book } from "../../Book";
import { BookService } from "../../services/book.service";
import { AlertService } from '../../services/alert.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  showAddBook: boolean = true;
  subscription!: Subscription;
  editSubcription!: Subscription;
  editBook?: Book;
  faTimes = faTimesCircle;

  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    author: new FormControl('',[
      Validators.required
    ]),
    ratings: new FormControl(25, [
      Validators.required,
      Validators.min(0),
      Validators.max(50)
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5000),
    ]),
    numberOfPages: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(600) // 600 minute means max 10 hrs
    ]),
    blurb: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(1000)
    ])
  })

  // name?: string;
  // author?: string;
  // ratings?: number = 25; 
  // price?: number; 
  // numberOfPages?: number; 
  // blurb?: string; 

  constructor(private router: Router, private uiService: UiService, private bookService: BookService, private alertService: AlertService) { 
    // this.subscription = this.uiService.onToggle().subscribe(value => this.showAddBook = value)
    this.uiService.onFormToBeShown().subscribe(value => {

      if(value) {
        this.showAddBook = true;
      } else {
        this.editBook = this.uiService.getBookToEdit();
        this.bookForm.patchValue({
          name: this.editBook?.name,
          author: this.editBook?.author,
          ratings: this.editBook?.ratings,
          price: this.editBook?.price,
          numberOfPages: this.editBook?.numberOfPages,
          blurb: this.editBook?.blurb
        })
      }
      // this.name = this.editBook?.name;
      // this.author = this.editBook?.author;
      // this.ratings = this.editBook?.ratings;
      // this.price = this.editBook?.price;
      // this.numberOfPages = this.editBook?.numberOfPages;
      // this.blurb = this.editBook?.blurb;
    })
  }

  ngOnInit(): void {
  }

  // toggleAddBook() {
  //   this.uiService.setShowAddBook(true);
  // }

  // toggleEditBook() {
  //   this.uiService.toggleEditBook();
  // }

  onEditSubmit() {
    // const newBook = {
    //   name: this.name,
    //   author: this.author,
    //   ratings: this.ratings,
    //   price: this.price,
    //   numberOfPages: this.numberOfPages,
    //   blurb: this.blurb
    // }
    const newBook = this.bookForm.value;
    this.bookService.editBook(newBook, this.editBook?.id);
    
    // Clear the form
    this.bookForm.patchValue({
      name: undefined,
      author: undefined,
      ratings: undefined,
      price: undefined,
      numberOfPages: undefined,
      blurb: undefined
    })
    // this.name = undefined;
    // this.author = undefined;
    // this.ratings = undefined;
    // this.price = undefined;
    // this.numberOfPages = undefined;
    // this.blurb = undefined;
    
    this.router.navigate([""]);

    // Show the alert
    this.alertService.success("Book Details Updated!!")
  }
  
  onSubmit() {
    
    // const newBook = {
    //     name: this.name,
    //     author: this.author,
    //     ratings: this.ratings,
    //     price: this.price,
    //     numberOfPages: this.numberOfPages,
    //     blurb: this.blurb
    //   }
      const newBook = this.bookForm.value;
      newBook.ratings = newBook.ratings / 10;
      this.bookService.addBook(newBook);

    // Clear the form
    this.bookForm.patchValue({
      name: undefined,
      author: undefined,
      ratings: undefined,
      price: undefined,
      numberOfPages: undefined,
      blurb: undefined
    })
    // this.name = undefined;
    // this.author = undefined;
    // this.ratings = undefined;
    // this.price = undefined;
    // this.numberOfPages = undefined;
    // this.blurb = undefined;

    // Now hide the popup
    // this.toggleAddBook();

    // Show the alert
    this.alertService.success("Book Added!!")
  }

  getRatings(): string {
    let val = parseInt(this.bookForm.get('ratings')?.value) ? parseInt(this.bookForm.get('ratings')?.value) / 10 : 0.0;
    let rating = val.toString() ;
    if(val % 1 == 0) {
      rating = rating + ".0";
    }
    
    return rating;
  }
}
