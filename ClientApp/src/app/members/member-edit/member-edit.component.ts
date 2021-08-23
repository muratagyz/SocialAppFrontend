import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';
import { AuthService } from 'src/app/_services/auth.service';
import { userService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        () => {
          this.alertify.success('Profiliniz Güncellendi.');
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }
}
