import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertifyjs.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login Başarılı');
        this.router.navigate(['/members']);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.warning('logout');
    this.router.navigate(['/home']);
  }
}
