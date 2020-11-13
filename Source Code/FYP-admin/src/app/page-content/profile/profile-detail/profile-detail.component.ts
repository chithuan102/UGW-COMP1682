import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCoreService } from 'src/app/app.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserDetail } from 'src/app/app.models';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profileDetail: any;
  listOfData: any[] = [];
  roomTypes: any[] = [];
  totalAmount = 0;
  userInfoForm!: FormGroup;
  isCreate = true;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,

    private appCoreService: AppCoreService) {
    this.profileDetail = new UserDetail();
    this.onCreateFormBuildder();
    this.route.params.subscribe((params) => {
      if (params.id !== 'create') {
        this.getProfilelDetail(params.id);
        this.isCreate = false;
      }
    });

  }
  ngOnInit(): void {
  }

  async getProfilelDetail(id) {
    const response = await this.appCoreService.getProfile(id);
    this.profileDetail = response.data;
    this.getHistory();
    this.onCreateFormBuildder();

  }

  async getHistory() {
    await this.onGetRoomTypes();
    const response = await this.appCoreService.bookingHistory(this.profileDetail);

    this.listOfData = response.data.items;

    this.listOfData = this.listOfData.map((item: any) => {
      return {
        ...item,
        roomType: this.roomTypes.find((room) => room.id === item.roomId)
      };
    });
    this.totalAmount = this.listOfData.reduce((prev, cur: any) => {
      return prev + cur.amount;
    }, 0);
    console.log(this.listOfData);;
    
  }

  async onGetRoomTypes() {
    const response = await this.appCoreService.getRoomTypes();
    this.roomTypes = response.data.items;
  }

  onSave() {

  }

  async onUpdateInfo() {
    const data = {
      ...this.profileDetail,
      ...this.userInfoForm.getRawValue()
    }
    if (this.userInfoForm.invalid) {
      this.appCoreService.errorMissingValue();
      return;
    }
    let response;
    if (this.isCreate) {
      response = await this.appCoreService.createProfileDetail(data);
    } else {
      response = await this.appCoreService.updateProfileDetail(data);
    }

    if (response.code === 200) {
      this.router.navigate(['profile']).then(() => {
        this.appCoreService.success('Save profile successfully');
      });
    }

  }

  onCreateFormBuildder() {
    this.userInfoForm = this.fb.group({
      email: [this.profileDetail.email, [, Validators.required]],
      id: [this.profileDetail.id, []],
      firstName: [this.profileDetail.firstName, [Validators.required]],
      lastName: [this.profileDetail.lastName, [Validators.required]],
      fullName: [this.profileDetail.fullName, []],
      phoneNumber: [this.profileDetail.phoneNumber],
      birthDate: [this.profileDetail.birthDate, []],
      address: [this.profileDetail.address, []],
      gender: [this.profileDetail.gender, []],
    });
  }



}
