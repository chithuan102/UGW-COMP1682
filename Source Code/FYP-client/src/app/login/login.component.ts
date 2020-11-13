import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserDetail } from '../app.models';
import { AppCoreService } from '../app.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth2: any;
  @ViewChild('loginRef', { static: false }) loginElement: ElementRef;
  @ViewChild('triggerClick', { static: false }) triggerClick: ElementRef;
  @ViewChild('showBlocked', { static: false }) showBlocked: ElementRef;
  @ViewChild('showNotActive', { static: false }) showNotActive: ElementRef;



  form = 1;
  formRegiser = new FormGroup({});
  formLogin = new FormGroup({});

  objectDetail = new UserDetail();
  phoneNumber = 0;
  accessToken = '';
  timeLeft = 0;
  interval;
  disabledResend = false;
  isClicked = false;

  isVisible = false;
  isVisibleNotActiveModal = false;
  user;
  constructor(
    private fb: FormBuilder,
    private appCoreService: AppCoreService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router) {
    this.onCreateFormBuilder();
  }

  ngOnInit(): void {
    this.googleSDK();

  }

  startTimer() {
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.disabledResend = false;
      }
    }, 1000);
  }

  onChangeForm() {
    if (this.form === 1) {
      this.form = 2;
    } else {
      this.form = 1;
    }
  }


  async onRegister() {
    if (this.formRegiser.valid) {
      let data = this.formRegiser.value;
      if (data.password !== data.confirmPassword) {
        this.appCoreService.error('Confirm password not match.', 'Invalid');
        return;
      }
      data = {
        ...data,
        acountType: 'CREATE',
        fullName: data.firstName + ' ' + data.lastName
      };
      const response = await this.appCoreService.createUser(data);
      if (response.code === 200) {
        this.appCoreService.success('Create successfully. Please check your email to active your account', 'Sucess');
        this.formRegiser.reset();
        return;
      }
      this.appCoreService.error(response.message, 'Invalid');
      return;
    }
    this.appCoreService.error('Please fill full information', 'Invalid');
  }

  async onLogin() {
    if (this.formLogin.valid) {
      const data = this.formLogin.value;
      const body = {
        ...data,
        loginType: 0
      };
      // const response = await this.appCoreService.login(data);
      // if (response.data && response.data.id !== 0) {
      //   this.userService.setUser(response.data, this.accessToken);
      //   this.router.navigate(['/']);
      // }
      this.appCoreService.login(body).then((response) => {
        if (response.status === 200) {
          const parseObject = JSON.parse(response.data);
          this.accessToken = parseObject.accessToken;
          this.appCoreService.getUserByToken({ accessToken: this.accessToken }).then(async (response2) => {
            this.user = response2.data;
            if (this.user.disabled) {
              this.showBlocked.nativeElement.click();
            } else if (!this.user.activated) {
              this.showNotActive.nativeElement.click();
            } else if (!this.user.phoneNumber) {
              this.triggerClick.nativeElement.click();
            } else {
              this.userService.setUser(this.user, this.accessToken);
              window.location.href = '/home';
            }
          });
        } else {
          this.appCoreService.error('Login error');
        }

      });
      return;
    }
    this.appCoreService.error('Please input username/password', 'Invalid');

  }

  onCreateFormBuilder() {
    this.formRegiser = this.fb.group(
      {
        email: new FormControl(this.objectDetail.email, [
          Validators.required,
        ]),
        firstName: new FormControl(this.objectDetail.firstName, [Validators.required]),
        lastName: new FormControl(this.objectDetail.lastName, [Validators.required]),
        phoneNumber: new FormControl(this.objectDetail.phoneNumber, [Validators.required]),
        password: new FormControl(this.objectDetail.password, [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      }
    );

    this.formLogin = this.fb.group({
      email: new FormControl(this.objectDetail.email, [
        Validators.required,
      ]),
      password: new FormControl(this.objectDetail.password, [Validators.required]),

    }
    );
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log(profile);
        const body = {
          fullName: profile.getName(),
          email: profile.getEmail(),
          googleId: profile.getId(),
          loginType: 1
        };
        this.appCoreService.login(body).then((response) => {
          const { data } = response;
          if (response.status === 200) {
            const parseObject = JSON.parse(response.data);
            this.accessToken = parseObject.accessToken;
            this.appCoreService.getUserByToken({ accessToken: this.accessToken }).then(async (response2) => {
              this.user = response2.data;
              if (this.user.disabled) {
                this.showBlocked.nativeElement.click();
              } else if (!this.user.phoneNumber) {
                this.triggerClick.nativeElement.click();
              } else {
                this.userService.setUser(this.user, this.accessToken);
                window.location.href = '/home';
              }
            });
          } else {
            this.appCoreService.error('Login error');
          }

        });
      });
  }

  loginBlocked() {
    this.appCoreService.error('Your account is blocked from login.Please contact suppoter for more information.');
  }

  googleSDK() {
    const w = (window as any);
    w.googleSDKLoaded = () => {
      w.gapi.load('auth2', () => {
        this.auth2 = w.gapi.auth2.init({
          client_id: '915607070785-2estlglodnsos87nobthbo406vp10ob7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    };
    ((d, s, id) => {
      let js: any = d.getElementsByTagName(s)[0];
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }
  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    if (this.phoneNumber === 0) {
      this.appCoreService.error('Please input your phone number');
      return;
    }
    const body = {
      ...this.user,
      phoneNumber: this.phoneNumber,
    };
    const response = await this.appCoreService.updateUserDetail(body);
    if (response.code === 200) {
      this.isVisible = false;
      this.userService.setUser(body, this.accessToken);
      window.location.href = '/home';
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  sendNewCode() {
    this.disabledResend = false;
    clearInterval(this.interval);
    this.disabledResend = true;
    this.onSendCode();
    this.startTimer();
  }

  async onSendCode() {
    const formLogin = this.formLogin.getRawValue();
    if (!formLogin.email) {
      this.appCoreService.error('Email is empty');
      return;
    }
    const response = await this.appCoreService.sendMail(formLogin.email);
    if (response.code === 200) {
      this.isClicked = true;
      this.startTimer();
      this.appCoreService.success('Send mail successfully. Please check you mail');
    } else {
      this.appCoreService.error('Send mail error');
    }
  }

  showNotActiveModal(): void {
    this.isVisibleNotActiveModal = true;
  }

  handleOkNotActiveModal(): void {
    this.isVisible = false;
  }

  handleCancelNotActiveModal(): void {
    this.isVisibleNotActiveModal = false;
  }


}
