import { Component, OnInit } from '@angular/core';
import { AppCoreService } from '../app.service';
import * as moment from 'moment';
import { UserService } from '../user.service';
import { UserDetail } from '../app.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  radioValue = 'BAO_KIM';
  dateFormat = 'yyyy/MM/dd';

  isShownService = false;
  noOfGuest = 2;
  listNoOfGuest: number[] = [];

  index = 0;
  disable = false;

  roomTypes: any[] = [];
  desHotel: any;
  selectedRoomType;
  dateRange: any[] = [];
  disableTabSelectRoom = true;
  disableTabInfo = true;
  disableTabPayment = true;
  isShowModalPayment = false;
  isShowModalLogin = false;

  loginForm!: FormGroup;
  infoForm!: FormGroup;
  paymentForm!: FormGroup;
  useBaokim = true;
  currentDateMili = moment(new Date(), 'YYYY-MM-DD 00:00:00').toDate().getTime();




  selectedRooms: any[] = [];
  totalPrice = 0;
  listAvailableRooms: any[] = [];
  user = new UserDetail();
  isShowRoomSelected = false;
  constructor(
    private appCoreService: AppCoreService,
    private userService: UserService,
    private route: ActivatedRoute,

    private fb: FormBuilder) {
    this.userService.getUser().subscribe((user) => {
      if (user && user !== 'null') {
        this.user = user;
        this.infoForm = this.fb.group({
          firstName: [user.firstName, [Validators.required]],
          lastName: [user.lastName, [Validators.required]],
          email: [{ value: user.email, disabled: true }, [Validators.required]],
          phoneNumber: [user.phoneNumber, [Validators.required]],
          idCardNumber: [user.idCardNumber, [Validators.required]],
          idCardType: [user.idCardType, [Validators.required]],
          address: [user.address, []],
          gender: [user.gender, []],
          id: [user.id, []],
          notes: [null, []],
        });
      }
    });
    this.route.queryParams.subscribe(async (params) => {
      const { fromDate, toDate, noOfGuest, roomType, stat, mrc_order_id } = params;
      await this.getHotelInfo();
      await this.onGetRoomTypes();
      if (
        fromDate &&
        toDate && noOfGuest &&
        moment.isDate(moment(fromDate, 'YYYY-MM-DD').toDate()) &&
        moment.isDate(moment(toDate, 'YYYY-MM-DD').toDate()) &&
        noOfGuest > 0) {

        this.isShowRoomSelected = true;
        if (Number.parseInt(roomType, 10) > 0) {
          this.selectedRoomType = this.roomTypes.find(rt => rt.id === Number.parseInt(roomType, 10));
        } else {
          this.selectedRoomType = this.roomTypes[0];
        }
        this.noOfGuest = noOfGuest;
        this.dateRange.push(moment(fromDate, 'YYYY-MM-DD').toDate());
        this.dateRange.push(moment(toDate, 'YYYY-MM-DD').toDate());
        this.onCheckRoom();
      } else if (roomType > 0) {
        this.selectedRoomType = this.roomTypes.find(rt => rt.id === Number.parseInt(roomType, 10));
      }
      if (stat) {
        this.updateBookingFromBaokim(stat, mrc_order_id);
      }

    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.paymentForm = this.fb.group({
      cardNumber: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });

  }

  onDisableAllTab() {
    this.disableTabSelectRoom = true;
    this.disableTabInfo = true;
    this.disableTabPayment = true;
  }


  onIndexChange(index: number): void {
    this.index = index;
    if (index === 1 && this.selectedRooms.length > 0) {
      this.isShowRoomSelected = true;
    }
  }


  onDateChange(result: Date): void {
    console.log('onChange: ', result);
  }

  onShowService() {
    if (this.isShownService) {
      this.isShownService = false;
    } else {
      this.isShownService = true;
    }
  }

  async getHotelInfo() {
    const response = await this.appCoreService.getHotelInfo();
    if (response.code === 200) {
      this.desHotel = response.data;

    }
  }


  onSelectDate(event) {
  }

  async onGetRoomTypes() {
    const response = await this.appCoreService.getRoomTypes();
    this.roomTypes = response.data.items;
    this.roomTypes.unshift({ title: 'ALL', id: 0 });
    this.selectedRoomType = this.roomTypes[0];
  }

  async onCheckRoom() {
    this.selectedRooms.length = 0;
    this.isShowRoomSelected = false;
    console.log(this.dateRange);

    if (!this.desHotel) {
      this.appCoreService.error('Please select hotel');
      return;
    }
    if (this.dateRange.length < 1) {
      this.appCoreService.error('Please select date range');
      return;
    }
    if (this.noOfGuest === 0) {
      this.appCoreService.error('Please input number of guest');
      return;
    }


    if (this.currentDateMili > this.dateRange[0].getTime()) {
      this.appCoreService.error('Cannot book room in the past');
      this.index = 0;
      this.disableTabSelectRoom = true;
      return;
    }
    if (this.dateRange[0].getTime() > this.dateRange[1].getTime()) {
      this.appCoreService.error('Invalid date');
      return;
    }
    const body = {
      ...this.desHotel,
      propertyId: this.desHotel.id,
      noOfGuest: this.noOfGuest,
      roomTypeId: this.selectedRoomType && this.selectedRoomType.id !== 0 ? this.selectedRoomType.id : 0,
      arrivalDate: moment(this.dateRange[0]).format('YYYY-MM-DD').toString(),
      departureDate: moment(this.dateRange[1]).format('YYYY-MM-DD').toString(),
    };
    const promisesGetRoom = this.appCoreService.getAvailableRoom(body);
    const promisesGetRoomType = this.appCoreService.getRooms();
    Promise.all([promisesGetRoom, promisesGetRoomType]).then((responses) => {
      const listRoom = responses[0].data.items;
      this.listAvailableRooms = responses[1].data.items;
      this.listAvailableRooms = this.listAvailableRooms.map((roomType: any) => {
        const roomChild = listRoom.filter((room) => room.roomType.id === roomType.id);
        roomType.rooms = [];
        if (roomChild.length > 0) {
          roomType.rooms = Array(roomChild.length).fill(0).map((x, i) => i + 1);
        }
        roomType.rooms.unshift(0);
        return {
          ...roomType,
          showService: false,
          totalSelected: 0,

        };
      });
      this.index = 1;
      this.disableTabSelectRoom = false;
    });


  }

  counter(i: number) {
    return new Array(i);
  }

  onChooseRoom() {
    this.selectedRooms = this.listAvailableRooms.filter((room) => room.totalSelected > 0);
    console.log(this.selectedRooms);

    if (this.selectedRooms.length > 0) {
      this.totalPrice = this.selectedRooms.reduce((prev, curren, item) => {
        let price = prev + curren.price * (curren.rooms.length - 1);
        console.log(item);

        return price;
      }, 0);
      this.isShowRoomSelected = true;
      return;
    }
    this.isShowRoomSelected = false;
    this.disableTabPayment = true;
    this.disableTabInfo = true;
  }

  bookNow() {
    if (!this.user || !this.user.id) {
      this.appCoreService.error('You must login to continue booking');
      return;
    }
    this.index = 2;
    this.isShowRoomSelected = false;
    this.disableTabInfo = false;
  }

  showModalPayment(): void {
    this.isShowModalPayment = true;
  }

  handleCancelPayment() {
    this.isShowModalPayment = false;
    // this.appCoreService.error('Payment failed', 'Error');
  }

  async handleOkPayment() {
    this.onCreateReservation();
  }

  async onCreateReservation() {
    if (this.useBaokim) {

    } else {
      if (this.paymentForm.invalid) {
        this.appCoreService.error('Please fill full information', 'Error');
        return;
      }
    }
    this.isShowModalPayment = false;
    const infoForm = this.infoForm.getRawValue();
    const data = this.paymentForm.getRawValue();
    const expirationDate = moment(data.expirationDate).format('YYYY-MM-DD');
    const body = {
      rooms: [
        ...this.selectedRooms
      ],
      paymentType: this.radioValue,
      cardNumber: data.cardNumber || 0,
      expirationDate,
      arrivalDate: this.dateRange[0],
      departureDate: this.dateRange[1],
      mainGuestId: this.user ? this.user.id : 0,
      propertyId: this.desHotel.id,
      noOfGuest: this.noOfGuest,
      userInfo: infoForm,
      notes: infoForm.notes,
      useBaokim: this.useBaokim

    };

    const response = await this.appCoreService.createReservation(body);
    const { code } = response;
    if (code === 200) {
      if (response.data) {
        window.location.href = response.data;
      } else {
        this.appCoreService.success('Create reservation successfully', 'Success');
        this.index = 0;
        return;
      }
    } else {
      this.appCoreService.error('Create reservation error', 'Error');
    }

  }

  resetBookingForm() {
    this.disableTabInfo = true;
    this.disableTabPayment = true;
    this.disableTabSelectRoom = true;
    this.noOfGuest = 0;
    this.dateRange = null;
    this.selectedRoomType = this.roomTypes[0];

  }

  async onPayNow() {
    const data = {
      ...this.user,
      ...this.infoForm.getRawValue()
    };
    console.log(data);
    if (this.infoForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    let response;
    if (data.id) {
      response = await this.appCoreService.updateUserDetail(data);
    } else {
      response = await this.appCoreService.createUser(data);
    }
    if (response.code === 200) {
      this.userService.setUserOnly(response.data);
      if (this.radioValue === 'BAO_KIM') {
        this.useBaokim = true;
        this.onCreateReservation();
      } else {
        this.useBaokim = false;
        this.onShowModalLogin();
      }

    }
  }

  onShowModalLogin() {
    this.isShowModalLogin = true;
  }

  handleCancelLogin() {
    this.isShowModalLogin = false;
    this.appCoreService.error('Payment failed', 'Error');
  }

  handleOkLogin() {
    if (this.loginForm.invalid) {
      this.appCoreService.error('Please fill full information', 'Error');
      return;
    }
    this.isShowModalLogin = false;
    this.showModalPayment();
  }

  getPrice10Total(list: any[]) {

  }

  async updateBookingFromBaokim(stat, mrc_order_id) {
    console.log('mrc_order_id ' + mrc_order_id);
    console.log('stat ' + stat);

    const body = {
      reservationId: mrc_order_id,
      stat
    };
    if (stat === 'c') {

    } else {
      // this.ƒappCoreService.error('Payment online failed');
    }
    const response = await this.appCoreService.paymentHook(body);
    if (response.code === 200 && stat === 'c') {
      this.appCoreService.success('Payment online successfully');
    }

  }
}
