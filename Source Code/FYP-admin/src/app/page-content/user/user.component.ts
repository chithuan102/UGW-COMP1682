import { Component, OnInit } from '@angular/core';
import { AppCoreService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { title } from 'process';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listOfData: any[] = [];
  listOfRole: any[] = [];


  isVisible = false;

  createForm: FormGroup;
  selectedRole;
  optionList: any[] = [];
  filterName = '';

  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.createForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }



  async getUsers() {
    const response = await this.appCoreService.getUsers();
    this.listOfData = response.data.items.filter(x => x.role.title !== 'ADMIN');;
  }

  async getRoles() {
    const response = await this.appCoreService.getRoles();
    this.listOfRole = response.data.items;
    this.createForm.patchValue({ role: this.listOfRole[0] });
  }

  showModal(): void {

    this.isVisible = true;
  }

  async handleOk() {

    if (this.createForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    const data = this.createForm.getRawValue();
    console.log(data);

    const response = await this.appCoreService.createUser(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getUsers();
      this.createForm.reset();
      this.isVisible = false;
      return;
    }

    this.appCoreService.error(response.message);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  delete(data): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>This action cant revert.</b>',
      nzOnOk: async () => {
        const response = await this.appCoreService.deleteUser(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getUsers();
          return;
        }
      }
    });
  }

  onResetFilter() {
    this.getUsers();
    this.filterName = '';
  }

  async onSearch() {
    if (!this.filterName) {
      await this.getUsers();
      return;
    }
    await this.getUsers();
    const filter = {
      username: this.filterName
    };

    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
      }
    });
    this.listOfData = this.listOfData.filter(object => {
      // tslint:disable-next-line: forin
      for (const key in filter) {
        if (object[key] === undefined || !(object[key] + '').toLocaleLowerCase().includes('' + filter[key].toLocaleLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }
  async onStatusChange(event, data) {
    data.disabled = !event;
    delete data.comments;
    delete data.roomServices;

    const response = await this.appCoreService.updateUser(data);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      // this.getAllRoomType();
    } else {
      data.disabled = false;
    }
  }
}
