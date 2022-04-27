import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Book } from "../../Book";
import { BookService } from "../../services/book.service";

@Component({
  selector: 'app-book-blurb',
  templateUrl: './book-blurb.component.html',
  styleUrls: ['./book-blurb.component.css']
})
export class BookBlurbComponent implements OnInit {

  book!: Book;

  constructor(private bookService: BookService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // this.bookService.getBook(id!).subscribe((book) => this.book = book);
    this.book = this.bookService.getBook(id!);
    // this.book = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.bookService.getBook(params.get('id')!))
    // );
  }

}
