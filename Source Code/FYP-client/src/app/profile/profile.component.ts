import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AppCoreService } from '../app.service';
import { UserDetail } from '../app.models';


interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showForm = 0;
  dateFormat = 'yyyy-MM-dd';
  data = [
    'Profile',
    'History',
    'Logout'
  ];
  userInfoForm!: FormGroup;

  changePasswordForm!: FormGroup;
  roomTypes: any[] = [];
  totalAmount = 0;


  isShowModalChangePassword = false;
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();
  user = new UserDetail();
  constructor(
    private userService: UserService,
    private router: Router, private fb: FormBuilder,
    private appCoreService: AppCoreService) {
    this.user = new UserDetail();
    this.onCreateFormBuilder(this.user);
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      if (this.user && this.user.id > 0) {
        this.getHistory();
        this.onCreateFormBuilder(this.user);
      }
    });
    this.changePasswordForm = this.fb.group({
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    });
  }



  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
  }

  showItem(item) {
    switch (item) {
      case 'Profile':
        this.showForm = 0;

        break;
      case 'History':
        this.showForm = 1;
        break;

      default:
        this.appCoreService.confirm('Are you wish to logout?').then((confirm) => {
          if (confirm.isConfirmed) {
            this.userService.clearUser();
            this.router.navigate(['/']);
          }
        });
        break;
    }
  }

  async onUpdateInfo() {
    const data = {
      ...this.user,
      ...this.userInfoForm.getRawValue(),
    };
    const response = await this.appCoreService.updateUserDetail(data);
    if (response.code === 200) {
      const newInfo = await this.appCoreService.getUserDetail(data.id);
      this.userService.setUserOnly(newInfo.data);
      this.appCoreService.success('Update user successfully');
    }

  }


  onUpdatePassword() {
    this.isShowModalChangePassword = true;

  }

  async handleOk() {
    if (this.changePasswordForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    const data = this.changePasswordForm.getRawValue();
    if (data.confirmNewPassword !== data.newPassword) {
      this.appCoreService.error('Confirm password not match new password.');
      return;
    }
    const body = {
      profileId: this.user.id,
      newPassword: data.newPassword
    };
    const response = await this.appCoreService.changeUserPassword(body);
    if (response.code === 400) {
      this.appCoreService.error(response.message);
      return;
    }
    this.appCoreService.success('Change password successfully');
    this.isShowModalChangePassword = false;
  }

  handleCancel(): void {
    this.isShowModalChangePassword = false;
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    });
  }

  async onGetRoomTypes() {
    const response = await this.appCoreService.getRoomTypes();
    this.roomTypes = response.data.items;
  }


  async getHistory() {
    await this.onGetRoomTypes();
    const response = await this.appCoreService.bookingHistory(this.user);
    this.listOfData = response.data.items;

    this.listOfData = this.listOfData.map((item: any) => {
      return {
        ...item,
        roomTitle: this.roomTypes.find((room) => room.id === item.roomId).title
      };
    });
    this.totalAmount = this.listOfData.reduce((prev, cur: any) => {
      return prev + cur.amount;
    }, 0);
  }

  onCreateFormBuilder(user) {
    this.userInfoForm = this.fb.group({
      email: [user.email, [, Validators.required]],
      id: [user.id, [, Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      fullName: [user.fullName, []],
      phoneNumber: [user.phoneNumber],
      birthDate: [user.birthDate, []],
      address: [user.address, []],
      gender: [user.gender, []],
      idCardType: [user.idCardType, []],
      idCardNumber: [user.idCardNumber, []],
    });
    console.log(this.userInfoForm.getRawValue());
    
  }
}
