import { Component, OnInit } from '@angular/core';
import { AppCoreService } from 'src/app/app.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user;
  newPassword = '';
  confirmNewPassword = '';
  oldPassword = '';


  constructor(private userService: UserService, private appCoreService: AppCoreService) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  async onUpdatePassword() {
    if (this.oldPassword !== this.user.password) {
      this.appCoreService.error('Old password not correct');
      return;
    }
    if (!this.newPassword) {
      this.appCoreService.error('New password is empty');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.appCoreService.error('Confirm password not match with new password');
      return;
    }
    const body = {
      ...this.user,
      password: this.newPassword
    };
    const response = await this.appCoreService.updateUser(body);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      this.newPassword = '';
      this.confirmNewPassword = '';
    }

  }

}
