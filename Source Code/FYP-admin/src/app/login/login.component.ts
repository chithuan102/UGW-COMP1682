import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCoreService } from '../app.service';
import { UserDetail } from '../app.models';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;
  userInfo = new UserDetail();
  constructor(
    private fb: FormBuilder,
    private appCoreService: AppCoreService,
    private userService: UserService,
    private router: Router,

  ) {

    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  async onLogin() {
    if (this.formLogin.invalid) {
      this.appCoreService.error('Please input full information');
      return;
    }
    const body = this.formLogin.getRawValue();
    const response = await this.appCoreService.onLogin(body);
    if (response.code === 400) {
      this.appCoreService.error(response.message);
      return;
    }
    const data = JSON.parse(response.data);




    localStorage.setItem('accessToken', data.accessToken);
    const getBodyInfo = {
      accessToken: data.accessToken
    };
    const response2 = await this.appCoreService.getUserInfoByToken(getBodyInfo);
    if (response2.code === 400) {
      this.appCoreService.error(response.message);
      return;
    }
    if (response2.data.role.disabled === true) {
      this.appCoreService.error('Your role is inactived. Please contact admin for more information');
      return;
    }
    if (response2.data.disabled === true) {
      this.appCoreService.error('Your account is inactived. Please contact admin for more information');
      return;
    }
    this.appCoreService.success('Login success');
    this.userInfo = response2.data;
    const listPermission = this.userInfo.role.permissions.map((permissions) => permissions.code);
    this.userService.setUser(this.userInfo);
    localStorage.setItem('permissions', listPermission);
    this.router.navigate(['']);
  }

}
