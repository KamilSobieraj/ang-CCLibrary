import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './library/books-list/books-list.component';
import { BookDetailsComponent } from './library/book-details/book-details.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { OrderBookComponent } from './order-panel/order-book/order-book.component';
import { ReserveBookComponent } from './order-panel/reserve-book/reserve-book.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LibraryComponent } from './library/library.component';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/navbar/navbar.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressSpinnerModule, MatTableModule
} from '@angular/material';
import { LoginPanelComponent } from './dashboard/login-panel/login-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailPasswordFormComponent } from './shared/email-password-form/email-password-form.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard/admin-dashboard.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './shared/material-module';
import { SearchBarComponent } from './library/search-bar/search-bar.component';
import { BookDetailsElementComponent } from './shared/book-details-element/book-details-element.component';
import { BookAvailabilityDetailComponent } from './library/book-details/book-availability-detail/book-availability-detail.component';
import { BookTagsDetailComponent } from './library/book-details/book-tags-detail/book-tags-detail.component';
import {UserDashboardComponent} from './dashboard/user-dashboard/user-dashboard.component';
import { UserDataCardComponent } from './dashboard/user-dashboard/user-data-card/user-data-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    OrderPanelComponent,
    OrderBookComponent,
    ReserveBookComponent,
    PageNotFoundComponent,
    LibraryComponent,
    DashboardPanelComponent,
    NavbarComponent,
    LoginPanelComponent,
    EmailPasswordFormComponent,
    AdminDashboardComponent,
    SearchBarComponent,
    BookDetailsElementComponent,
    BookAvailabilityDetailComponent,
    BookTagsDetailComponent,
    UserDashboardComponent,
    UserDataCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MaterialModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
