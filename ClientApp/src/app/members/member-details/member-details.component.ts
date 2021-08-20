import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';
import { userService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  constructor(
    private userService: userService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        this.alertify.error(err);
      }
    );
  }
}
