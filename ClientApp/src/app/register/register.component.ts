import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertifyjs.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService,private alertify: AlertifyService) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('kullanıcı oluşturuldu.');
      },
      (eroor) => {
        this.alertify.error(eroor);
      }
    );
  }
}
