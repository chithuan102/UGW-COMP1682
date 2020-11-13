import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppCoreService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  isVisible = false;

  createForm: FormGroup;

  reservation = {
    id: 0,
    arrivalDate: '',
    departureDate: '',
    guests: [],
    reservationStatus: '',
    roomId: 0,
    guestName: '',
    email: '',
    phoneNumber: '',
    mainGuestId: 0,
    price: 0,
    amount: 0,
    transactions: []
  };

  balance = 0;
  transactionCodes: any[] = [];

  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getReservationDetail(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      transactionCode: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, []],
    });
    this.getTransaction();
  }

  async getReservationDetail(id) {
    const response = await this.appCoreService.getReservationDetail(id);
    this.reservation = response.data;
    this.balance = this.reservation.transactions.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
  }

  async getTransaction() {
    const response = await this.appCoreService.getAllTransactionCode();
    this.transactionCodes = response.data.items;

  }

  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    if (this.createForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    let data = this.createForm.getRawValue();
    console.log(this.reservation);
    console.log(data);

    if (data.transactionCode.type === 'PAYMENT') {
      data.price = -Math.abs(data.price);
    } else {
      data.price = Math.abs(data.price);
    }

    const transactioCode = data.transactionCode;
    delete data.transactionCode;
    data = {
      ...data,
      transactionCodeId: transactioCode.id,
      transactionCode: transactioCode.name,
      type: transactioCode.type,
      reservation: {
        id: this.reservation.id
      }
    };
    console.log(data);

    const response = await this.appCoreService.createFolioTransaction(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.isVisible = false;
      this.getReservationDetail(this.reservation.id);
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
        const response = await this.appCoreService.deleteFolioTransaction(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getReservationDetail(this.reservation.id);
        }
      }
    });
  }

  async checkOut() {
    if (this.balance > 0) {
      this.appCoreService.error('Balance is not zero');
      return;
    }
    this.modal.confirm({
      nzTitle: '<i>Do you want to checkout this reservation ?</i>',
      nzContent: '<b>This action cant revert.</b>',
      nzOnOk: async () => {
        const response = await this.appCoreService.checkoutReservation(this.reservation);
        if (response.code === 200) {
          this.appCoreService.success('Checkout successfully');
          this.getReservationDetail(this.reservation.id);
          this.router.navigate(['reservation']);
        }
      }
    });

  }

}
