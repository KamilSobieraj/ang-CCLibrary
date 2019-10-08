import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../dashboard/auth.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {UserService} from '../../dashboard/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.userLoginStatus()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
  }

  goToLoginPanel(): void {
    this.router.navigate(['login']);
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }

  getCurrentUserEmail(): string {
    return JSON.parse(localStorage.getItem('userData')).email;
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) due to componentDestroyed(this) to work
  }
}
