import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCoreService } from 'src/app/app.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss']
})
export class RoomServiceComponent implements OnInit {

  listOfData: any[] = [];

  isVisible = false;

  createForm: FormGroup;
  filterName = '';

  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.getAllService();
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],

    });
  }



  async getAllService() {
    const response = await this.appCoreService.getAllService();
    this.listOfData = response.data.items;

  }



  async onStatusChange(event, data) {
    data.disabled = !event;
    const response = await this.appCoreService.updateService(data);
    if (response.code === 200) {
      this.appCoreService.success('Update Successfully');
    }
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
    const response = await this.appCoreService.createService(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getAllService();
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
        const response = await this.appCoreService.deleteService(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getAllService();
        }
      }
    });
  }

  onResetFilter() {
    this.getAllService();
    this.filterName = '';
  }

  async onSearch() {
    if (!this.filterName) {
      await this.getAllService();
      return;
    }
    await this.getAllService();
    const filter = {
      title: this.filterName
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

}
