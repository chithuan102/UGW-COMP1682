import { Component, OnInit } from '@angular/core';
import { AppCoreService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  listOfData: any[] = [];

  isVisible = false;

  createForm: FormGroup;

  filterGuestName = '';
  filterEmail = '';
  filterPhone = null;


  constructor(
    private appCoreService: AppCoreService,
    private router: Router,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.getProfile();
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      type: ['SERVICE', [Validators.required]],
    });
  }



  async getProfile() {
    const response = await this.appCoreService.getAllProfile();
    this.listOfData = response.data.items;

  }

  showModal(): void {

    this.router.navigate(['/profile/create']);
  }

  async handleOk() {
    if (this.createForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    const data = this.createForm.getRawValue();
    const response = await this.appCoreService.createTransactionCode(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getProfile();
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  delete(data): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>This action cant revert.</b>',
      nzOnOk: async () => {
        const response = await this.appCoreService.deleteTransactionCode(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getProfile();
        }
      }
    });
  }

  onResetFilter() {
    this.filterEmail = '';
    this.filterGuestName = '';
    this.filterPhone = null;

  }

  async onSearch() {
    if (!this.filterEmail && !this.filterPhone && !this.filterGuestName) {
      await this.getProfile();
      return;
    }
    await this.getProfile();
    const filter = {
      firstName: this.filterGuestName,
      lastName: this.filterGuestName,
      fullName: this.filterGuestName,
      phoneNumber: this.filterPhone,
      email: this.filterEmail

    };

    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
      }
    });
    console.log(filter);


    this.listOfData = this.listOfData.filter(profile => {
      // tslint:disable-next-line: forin
      for (const key in filter) {
        switch (key) {
          case 'firstName':
          case 'lastName':
          case 'fullName':
            if (!(profile.firstName + ' ' + profile.lastName).toLocaleLowerCase().includes('' + filter[key].toLocaleLowerCase())) {
              return false;
            }
            break;

          default:
            if (profile[key] === undefined || !(profile[key] + '').includes('' + filter[key])) {
              return false;
            }
            break;
        }
      }
      return true;
    });
  }

  async onStatusChange(event, data) {
    data.disabled = !event;
    const response = await this.appCoreService.updateProfileDetail(data);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      // this.getAllRoomType();
    } else {
      data.disabled = false;
    }
  }



}
