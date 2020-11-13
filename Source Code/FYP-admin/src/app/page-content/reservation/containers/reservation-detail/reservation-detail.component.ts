import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCoreService } from 'src/app/app.service';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  listOfData: any[];
  listOfSubGuest: any[] = [];
  listOfDisplayData: any[] = [];
  modalTitle: string;
  subGuestCheckedId: number;
  roomService: any[] = [];
  roomToChange: any;
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
    notes: '',
    checkInDate: '',
    checkOutDate: '',
    paymentType: '',
    transactions: []
  };
  guestInfo = {
    id: 0,
    guestName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    title: '',
    fullName: ''
  };

  roomInfo = {
    title: '',
    type: '',
    maxOccupancy: 0,
    roomServices: []
  };
  totalDate = 0;

  isVisible = false;
  visible = false;
  mainGuest;
  searchValue = '';
  isVisibleChangeRoom = false;
  rooms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private appCoreService: AppCoreService,
    private modal: NzModalService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getReservationDetail(params.id);
      }
    })
  }

  ngOnInit(): void {
  }

  async getReservationDetail(id) {
    const response = await this.appCoreService.getReservationDetail(id);
    this.reservation = response.data;
    console.log(this.reservation);

    this.reservation.arrivalDate = moment(this.reservation.arrivalDate).format('YYYY-MM-DD');
    this.reservation.departureDate = moment(this.reservation.departureDate).format('YYYY-MM-DD');
    const date1: any = new Date(this.reservation.arrivalDate);
    const date2: any = new Date(this.reservation.departureDate);
    const diffTime = Math.abs(date2 - date1);
    this.totalDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (this.reservation.mainGuestId === 0) {
      this.guestInfo = {
        guestName: this.reservation.guestName,
        firstName: this.reservation.guestName.split(' ')[1],
        email: this.reservation.email,
        phoneNumber: this.reservation.phoneNumber,
        lastName: this.reservation.guestName.split(' ')[0],
        address: '',
        fullName: '',

        title: '',
        id: this.reservation.mainGuestId
      };
    } else {
      const responseProfile = await this.appCoreService.getProfile(this.reservation.mainGuestId);
      this.guestInfo = responseProfile.data;
      this.onGetAllGuest();

      const responseRoomType = await this.appCoreService.getRoomType(this.reservation.roomId);
      this.roomInfo = responseRoomType.data;
      console.log(this.roomInfo);

    }
    await this.onGetAllRoom();
  }

  async onGetAllGuest() {
    const reponse = await this.appCoreService.getAllProfile();
    this.listOfSubGuest = reponse.data.items.filter((item) => item.id !== this.guestInfo.id);
    this.listOfDisplayData = [...this.listOfSubGuest];
  }


  goToBilling() {
    this.router.navigate(['reservation/billing', this.reservation.id]);
  }

  showAddSubGuestModal(): void {
    this.isVisible = true;
    this.modalTitle = 'Add Sub Guest';
  }

  async handleOk() {
    console.log('Button ok clicked!');
    this.isVisible = false;

    console.log(this.subGuestCheckedId);
    if (this.subGuestCheckedId > 0) {

      this.reservation.guests.push({ id: this.subGuestCheckedId });
    }
    console.log(this.reservation);
    const response = await this.appCoreService.addGuest({ guests: this.reservation.guests.map(x => x.id), reservationId: this.reservation.id });
    this.subGuestCheckedId = 0;
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      this.getReservationDetail(this.reservation.id);
    }

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  onItemChecked(data: any, id: number, checked: boolean): void {
    console.log(checked);

    if (checked) {
      this.subGuestCheckedId = id;
    } else {
      this.subGuestCheckedId = 0;
    }
  }

  async deleteSubGuest(data) {
    this.reservation.guests = this.reservation.guests.filter(guest => guest.id !== data.id);
    const response = await this.appCoreService.addGuest({ guests: this.reservation.guests.map(x => x.id), reservationId: this.reservation.id });
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
    }
    this.getReservationDetail(this.reservation.id);
  }

  onSearchSubGuest(text) {

  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfSubGuest.filter((item: any) => item.fullName.indexOf(this.searchValue) !== -1);
  }

  async checkIn() {
    const response = await this.appCoreService.checkInReservation(this.reservation);
    if (response.code === 200) {
      this.appCoreService.success('Checkin successfully');
      this.getReservationDetail(this.reservation.id);
    }
  }

  async cancelReservation() {
    this.modal.confirm({
      nzTitle: '<i>Do you want to cancel this reservation ?</i>',
      nzContent: '<b>This action cant revert.</b>',
      nzOnOk: async () => {
        const body = {
          id: this.reservation.id
        }
        const response = await this.appCoreService.cancelReservation(body);
        if (response.code === 200) {
          this.appCoreService.success('Cancel reservation successfully');
          this.getReservationDetail(this.reservation.id);
        }
      }
    });

  }

  cancelChangeRoom() {
    this.isVisibleChangeRoom = false;

  }

  onChangeRoom() {
    this.isVisibleChangeRoom = true;
  }
  checkOut() {
    const price = this.reservation.transactions.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0);
    if (price > 0) {
      this.appCoreService.error('Balance is not zero');
      return;
    } else {
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

  async onSubmitChangeRoom() {
    if (this.roomToChange == null) {
      this.appCoreService.error('No room selected');
    }
    const body = {
      reservationId: this.reservation.id,
      roomId: this.roomToChange.id
    };
    console.log(body);
    const response = await this.appCoreService.changeRoom(body);
    if (response.code === 200) {
      this.appCoreService.success('Change room success');
      await this.getReservationDetail(this.reservation.id);
      this.isVisibleChangeRoom = false;
    } else {
      this.appCoreService.error(response.message);
    }

  }


  async onGetAllRoom() {
    const response = await this.appCoreService.getRooms();
    this.rooms = response.data.items.filter((room) => room.id !== this.reservation.roomId && room.roomStatus === 'AVAILABLE');
    console.log(this.rooms);
    this.roomToChange = this.rooms[0];
  }



}
