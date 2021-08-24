import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';
import { AuthService } from 'src/app/_services/auth.service';
import { userService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css'],
})
export class MessageCreateComponent implements OnInit {
  @Input() recipientId: number;
  message: any = {};
  constructor(
    private activeModel: NgbActiveModal,
    private authService: AuthService,
    private userService: userService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.recipientId);
  }
  closeModal() {
    this.activeModel.close();
  }
  sendMessage() {
    this.message.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.message)
      .subscribe(
        (result) => {
          console.log(result);
          this.alertifyService.success('message has been sent');
          this.activeModel.close();
          this.router.navigate(['/messages']);
        },
        (err) => {
          this.alertifyService.error(err);
        }
      );
  }
}
