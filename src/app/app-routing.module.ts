import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth.guard";

import { BookListComponent } from "../app/components/book-list/book-list.component";
import { BookBlurbComponent } from "../app/components/book-blurb/book-blurb.component";
import { LoginComponent } from "../app/components/login/login.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [{
  path: "", component: BookListComponent, canActivate: [AuthGuard]
}, {
  path: "blurb/:id", component: BookBlurbComponent, canActivate: [AuthGuard]
}, {
  path: "addBook", component: AddBookComponent, canActivate: [AuthGuard]
}, {
  path: "login", component: LoginComponent
}, {
  path: "**", component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
