import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertifyjs.service';
import { userService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  public loading = false;
  userParams: any = {};
  constructor(
    private userService: userService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.userParams.orderby = 'lastactive';
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(null, this.userParams).subscribe(
      (users) => {
        this.loading = false;
        this.users = users;
      },
      (err) => {
        this.loading = false;
        this.alertify.error(err);
      }
    );
  }
}
