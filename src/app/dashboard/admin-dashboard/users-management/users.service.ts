import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../../user.model';
import {DatabaseService} from '../../../core/database.service';
import {UserTable} from './users-table.model';
import {OperationsService} from '../../../order-panel/operations.service';
import {BooksService} from '../../../library/books.service';
import {CurrentBorrowedBookDetails} from '../../currentBorrowedBookDetails.model';
import {UserService} from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData$ = new Subject<User[]>();
  usersData: User[];
  chosenUserDetails$ = new Subject<UserTable[]>();
  chosenUserBorrowedBooksDetails$ = new Subject<CurrentBorrowedBookDetails[]>();

  constructor(private databaseService: DatabaseService,
              private operationsService: OperationsService,
              private bookService: BooksService,
              private userService: UserService) { }

  getUsersBasicData(): Observable<User[]> {
    this.databaseService.getData('users').subscribe(allUsersData => {
      this.usersData = allUsersData;
      this.usersData$.next(allUsersData);
    });
    return this.usersData$.asObservable();
  }

  removeUser(userID: string) {
    this.databaseService.deleteData('users', userID).subscribe(res => {
      this.getUsersBasicData().subscribe();
    });
  }

  setChosenUserOperationsDetails(userID: string): void {
    const userDetails = [];
    this.databaseService.getItemData('users', userID).subscribe((userData: User) => {
      userData.history.map(operationID => {
        const operationDetails = this.operationsService.getOperationData(operationID);
        const bookTitle = this.bookService.getBookDetails(operationDetails.bookID).title;
        const operationType = operationDetails.operationType === 'borrow' ? 'Wypożyczono' : 'Oddano';
        userDetails.push({title: bookTitle, operationType, operationDate: operationDetails.date });
        this.chosenUserDetails$.next(userDetails);
      });
    });
  }

  getChosenUserOperationsDetails(chosenUserID: string): Observable<any> {
    this.setChosenUserOperationsDetails(chosenUserID);
    return this.chosenUserDetails$.asObservable();
  };

  setChosenUserBorrowedBooksDetails(userID: string): void {
    const borrowedBooksDetails = [];
    const chosenUserCurrentlyBorrowedBooksIDS = this.userService.getUserDataByID(userID)[0].currentBorrowedBooks;
    chosenUserCurrentlyBorrowedBooksIDS.map(borrowBasicDetails => {
      const borrowedBookDate = this.userService.getOperationData(borrowBasicDetails.operationID).date;
      const bookID = this.userService.getOperationData(borrowBasicDetails.operationID).bookID;
      const borrowedBookTitle = this.bookService.getBookDetails(bookID).title;
      borrowedBooksDetails.push({borrowedBookTitle, borrowedBookDate, bookID});
    });
    // console.log(borrowedBooksDetails);
    this.chosenUserBorrowedBooksDetails$.next(borrowedBooksDetails);
    // return borrowedBooksDetails;
  }

  getChosenUserBorrowedBooksDetails(userID: string): Observable<CurrentBorrowedBookDetails[]> {
    this.setChosenUserBorrowedBooksDetails(userID);
    return this.chosenUserBorrowedBooksDetails$.asObservable();
  }
}
