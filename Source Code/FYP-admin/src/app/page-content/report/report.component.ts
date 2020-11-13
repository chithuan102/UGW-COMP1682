import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppCoreService } from 'src/app/app.service';
import { sortBy } from 'lodash';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @ViewChild('tableSummary', { static: false }) tableSummary: ElementRef;
  @ViewChild('tableTransaction', { static: false }) tableTransaction: ElementRef;
  @ViewChild('tableReservation', { static: false }) tableReservation: ElementRef;


  listOfData: any[] = [];
  dateFormat = 'yyyy-MM-dd';
  dateSummary: any[] = [];
  dateTransaction: any[] = [];

  reservations: any[] = [];
  reportSummary = {
    total_booking: 0,
    total_arrival: 0,
    total_inhouse: 0,
    total_checkout: 0,
    total_cancelled: 0,
    total_new_guest: 0,
    total_comment_create: 0,
    total_revenue: 0,
    total_service_used: 0,
  }
  reportTransaction: any[] = [];
  transactionType = 'ALL';
  reservationType = 'ALL';

  dateReservation: any[] = [];

  totalBalanceAmount = 0;
  totalPaymentAmount = 0;
  totalServiceAmount = 0;


  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }


  async runReportSummary(type) {
    if (this.dateSummary.length < 1) {
      this.appCoreService.error('Please select date before run report');
      return;
    }
    const body = {
      type,
      fromDate: this.dateSummary[0],
      toDate: this.dateSummary[1],
    };
    const response = await this.appCoreService.getReport(body);
    if (response.code === 200) {
      this.appCoreService.success('Run report success');
      this.reportSummary = response.data;
    }
  }

  async runReportTransaction(type) {
    if (this.dateTransaction.length === 0) {
      this.appCoreService.error('Please select date');
      return;
    }
    const body = {
      type,
      fromDate: this.dateTransaction[0],
      toDate: this.dateTransaction[1],
      transactionType: this.transactionType
    };
    const response = await this.appCoreService.getReport(body);
    if (response.code === 200) {
      this.appCoreService.success('Run report success');
      const transactions = [];
      response.data.items.filter(reservation => transactions.push(...reservation.transactions));
      this.reportTransaction = sortBy(transactions, ['reservation.id']);
      // tslint:disable-next-line: max-line-length
      const arrayGuestPromises = this.reportTransaction.map(async (item: any) => await this.appCoreService.getProfile(item.reservation.mainGuestId));
      Promise.all([...arrayGuestPromises]).then((responses2) => {
        const guests = responses2.filter((res) => res.data).map((res) => res.data);
        this.reportTransaction = this.reportTransaction.map((item) => {
          if (item.reservation) {
            const guestValid = guests.find((x) => x.id === item.reservation.mainGuestId);
            console.log(guestValid);

            return ({ ...item, mainGuest: guestValid });
          }
          return item;
        });
        if (this.transactionType !== 'ALL') {
          this.reportTransaction = this.reportTransaction.filter((transaction) => transaction.type === this.transactionType);
        }
        this.totalBalanceAmount = this.reportTransaction.reduce((prev, cur) => {
          return prev + Math.abs(cur.price);
        }, 0);
        this.totalServiceAmount = this.reportTransaction.reduce((prev, cur) => {
          if (cur.type === 'SERVICE') {
            return prev + Math.abs(cur.price);
          }
          return prev;
        }, 0);
        this.totalPaymentAmount = this.reportTransaction.reduce((prev, cur) => {
          if (cur.type === 'PAYMENT') {
            return prev + Math.abs(cur.price);
          }
          return prev;
        }, 0);

      });



    }
  }

  async runReportReservation(type) {
    if (this.dateReservation.length === 0) {
      this.appCoreService.error('Please select date before run report');
      return;
    }
    const body = {
      type,
      fromDate: this.dateReservation[0],
      toDate: this.dateReservation[1],
      transactionType: this.transactionType
    };
    const response = await this.appCoreService.getReport(body);
    this.reservations = response.data.items;
    if (this.reservationType !== 'ALL') {
      this.reservations = response.data.items.filter(item => item.reservationStatus === this.reservationType);
    }
    const arrayGuestPromises = this.reservations.map(async (item: any) => await this.appCoreService.getProfile(item.mainGuestId));
    Promise.all([...arrayGuestPromises]).then((responses2) => {
      const guests = responses2.filter((res) => res.data).map((res) => res.data);
      this.reservations = this.reservations.map((item) => {

        const guestValid = guests.find((x) => x.id === item.mainGuestId);
        return ({ ...item, mainGuest: guestValid });
      });
      // const responseRoomType = await this.appCoreService.getRoomType(this.reservation.roomId);
      // this.roomInfo = responseRoomType.data;
      // console.log(this.roomInfo);

      const arrayRoomPromisses = this.reservations.map(async (item: any) => await this.appCoreService.getRoomType(item.roomId));
      Promise.all([...arrayRoomPromisses]).then((responses3) => {
        const rooms = responses3.filter((res) => res.data).map((res) => res.data);
        this.reservations = this.reservations.map((item) => {
          const roomValid = rooms.find((x) => x.id === item.roomId);
          return ({ ...item, roomType: roomValid });
        });
        console.log(this.reservations);
      });
    });



    this.appCoreService.success('Run report success');

  }


  exportSummary() {
    const json = [];
    json.push({ Type: 'Total booking', Value: this.reportSummary.total_booking });
    json.push({ Type: 'Total arrival', Value: this.reportSummary.total_arrival });
    json.push({ Type: 'Total inhouse', Value: this.reportSummary.total_inhouse });
    json.push({ Type: 'Total checkout', Value: this.reportSummary.total_checkout });
    json.push({ Type: 'Total cancelled', Value: this.reportSummary.total_cancelled });
    json.push({ Type: 'Total new guest', Value: this.reportSummary.total_new_guest });
    json.push({ Type: 'Total comments', Value: this.reportSummary.total_comment_create });
    json.push({ Type: 'Total revenue', Value: this.reportSummary.total_revenue * -1 });
    json.push({ Type: 'Total service used', Value: this.reportSummary.total_service_used });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Summary-Report-' + moment().format('YYYY-MM-DD') + '.xlsx');
  }

  exportTransaction() {
    if (this.reportTransaction.length === 0) {
      this.appCoreService.error('Please run report before run');
      return;
    }
    const clone = Object.assign([], this.reportTransaction);
    const jsonExcel = clone.map(item => {
      delete item.createdTime;
      delete item.updatedTime;
      delete item.disabled;
      delete item.title;
      const cookedBody = {
        ...item,
        mainGuestId: item.mainGuest.id,
        mainGuestName: item.mainGuest.lastName + ' ' + item.mainGuest.firstName,
        reservationId: item.reservation.id,
        reservationStatus: item.reservation.reservationStatus,

      };
      delete cookedBody.reservation;
      delete cookedBody.mainGuest;
      return cookedBody;
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Transaction-Report-' + moment().format('YYYY-MM-DD') + '.xlsx');
  }

  exportReservation() {
    if (this.reservations.length === 0) {
      this.appCoreService.error('Please run report before run');
      return;
    }
    const clone = Object.assign([], this.reservations);
    const jsonExcel = clone.map(res => {
      delete res.createdTime;
      delete res.updatedTime;
      delete res.disabled;
      delete res.title;
      delete res.occupancy;
      delete res.numberOfAdult;
      delete res.numberOfChildren;
      const totalServiceAmount = res.transactions.reduce((prev, cur) => {
        if (cur.type === 'SERVICE') {
          return prev + Math.abs(cur.price);
        }
        return prev;
      }, 0);
      const totalPaymentAmount = res.transactions.reduce((prev, cur) => {
        if (cur.type === 'PAYMENT') {
          return prev + Math.abs(cur.price);
        }
        return prev;
      }, 0);
      const cookedBody = {
        ...res,
        guestName: res.mainGuest.lastName + ' ' + res.mainGuest.firstName,
        phoneNumber: res.mainGuest.phoneNumber,
        email: res.mainGuest.email,
        totalServiceAmount,
        totalPaymentAmount,
        roomName: res.roomType.title,
        subGuest: res.guests.length,
      };
      delete cookedBody.roomType;
      delete cookedBody.guest;
      delete cookedBody.transactions;
      delete cookedBody.mainGuest;
      return cookedBody;
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Reservation-Report-' + moment().format('YYYY-MM-DD') + '.xlsx');
  }

}
