import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageCreateComponent } from 'src/app/messages/message-create/message-create.component';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';
import { AuthService } from 'src/app/_services/auth.service';
import { userService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  followText: string = 'Follow';
  constructor(
    private userService: userService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modelService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

  followUser(userId: number) {
    this.userService
      .followUser(this.authService.decodedToken.nameid, userId)
      .subscribe(
        (result) => {
          this.alertify.success(
            this.user.name + ' kullanıcısı takip ediyorsunuz'
          );
          this.followText = 'You Are following';
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }
  openSendMessageModel() {
    const modelRef = this.modelService.open(MessageCreateComponent);
    modelRef.componentInstance.recipientId = this.user.id;
  }
}
