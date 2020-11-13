import { Component, OnInit } from '@angular/core';
import { AppCoreService } from '../app.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dateFormat = 'yyyy/MM/dd';
  hotels: any[] = [];
  roomTypes: any[] = [];

  desHotel: any;
  selectedRoomType: any;
  dateRange: any[] = [];
  noOfGuest = 0;
  rooms: any[] = [];
  mostPopular: any[] = [];
  mostBooked: any[] = [];


  options = { items: 3, dots: false, navigation: false };
  carouselClasses = ['owl-theme', 'row', 'sliding'];

  constructor(
    private appCoreService: AppCoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoomTypes();
    // this.getRooms();
  }


  async getRoomTypes() {
    const response = await this.appCoreService.getRoomTypes();
    this.roomTypes = response.data.items;
    this.rooms = response.data.items;
    this.rooms = this.rooms.map((room) => {
      const rate = room.comments.reduce((cur, rev) => {
        return cur + rev.rate;
      }, 0);
      return {
        ...room,
        rate: rate > 0 ? (5 + rate / room.comments.length) / 2 : 5
      };
    });

    this.mostPopular = orderBy(this.rooms, ['rate'], ['desc']);
    this.mostBooked = orderBy(this.rooms, ['totalBooked'], ['desc']);
    this.roomTypes.unshift({ title: 'ALL', id: 0 });
    this.selectedRoomType = this.roomTypes[0];
  }


  checkAvaibility() {

  }
  onSelectDate(event) {

  }

  async onCheckRoom() {
    if (this.dateRange.length < 1) {
      this.appCoreService.error('Please select date range');
      return;
    }
    if (this.noOfGuest === 0) {
      this.appCoreService.error('Please input number of guest');
      return;
    }

    this.router.navigate(['booking'], {
      queryParams: {
        roomType: this.selectedRoomType ? this.selectedRoomType.id : '',
        noOfGuest: this.noOfGuest,
        fromDate: moment(this.dateRange[0]).format('YYYY-MM-DD'),
        toDate: moment(this.dateRange[1]).format('YYYY-MM-DD')
      }
    });
  }



  // async getRooms() {
  //   const response = await this.appCoreService.getRooms();
  //   const { items } = response.data;
  //   this.rooms = items;

  // }
}
