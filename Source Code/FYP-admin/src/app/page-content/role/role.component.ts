import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCoreService } from 'src/app/app.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {


  listOfData: any[] = [];
  listOfRole: any[] = [];


  isVisible = false;

  createForm: FormGroup;
  filterName = '';


  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.getRoles();
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
    });
  }

  async getRoles() {
    const response = await this.appCoreService.getRoles();
    this.listOfRole = response.data.items.filter(x => x.title !== 'ADMIN');
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
    if (data.title === 'ADMIN') {
      this.appCoreService.error('Cannot create role ADMIN');
      return;
    }
    const response = await this.appCoreService.createRole(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getRoles();
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
        const response = await this.appCoreService.deleteRole(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getRoles();
          return;
        }
      }
    });
  }

  onResetFilter() {
    this.getRoles();
    this.filterName = '';
  }

  async onSearch() {
    if (!this.filterName) {
      await this.getRoles();
      return;
    }
    await this.getRoles();
    const filter = {
      title: this.filterName
    };

    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
      }
    });
    this.listOfRole = this.listOfRole.filter(object => {
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

    const response = await this.appCoreService.updateRoleDetail(data);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      // this.getAllRoomType();
    } else {
      data.disabled = false;
    }
  }

}
