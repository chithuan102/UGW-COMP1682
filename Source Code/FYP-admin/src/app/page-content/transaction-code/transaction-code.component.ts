import { Component, OnInit } from '@angular/core';
import { AppCoreService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-transaction-code',
  templateUrl: './transaction-code.component.html',
  styleUrls: ['./transaction-code.component.scss']
})
export class TransactionCodeComponent implements OnInit {

  listOfData: any[] = [];

  isVisible = false;

  createForm: FormGroup;
  filterName ='';

  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.getTransaction();
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      type: ['SERVICE', [Validators.required]],
      name: [null, [Validators.required]],
    });
  }



  async getTransaction() {
    const response = await this.appCoreService.getAllTransactionCode();
    this.listOfData = response.data.items;

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
    const response = await this.appCoreService.createTransactionCode(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getTransaction();
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
          this.getTransaction();
        }
      }
    });
  }


  onResetFilter() {
    this.getTransaction();
    this.filterName = '';
  }

  async onSearch() {
    if (!this.filterName) {
      await this.getTransaction();
      return;
    }
    await this.getTransaction();
    const filter = {
      name: this.filterName
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
