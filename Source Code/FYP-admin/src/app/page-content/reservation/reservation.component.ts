import { Component, OnInit } from '@angular/core';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { AppCoreService } from 'src/app/app.service';
import * as moment from 'moment';
import { LoginComponent } from 'src/app/login/login.component';

interface Person {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
}


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  constructor(private appCoreService: AppCoreService) { }

  reservations: any[] = [];
  currentDate = null;
  currentIndex = 0;
  filterGuestName = '';
  filterResId = null;

  filterStatus = 'ALL';
  ngOnInit(): void {
    this.getReservations();
  }


  async getReservations() {
    const response = await this.appCoreService.getReservations();
    console.log(response);
    this.reservations = response.data.items;
    const arrayRoomPromisses = this.reservations.map(async (item: any) => await this.appCoreService.getRoomType(item.roomId));
    Promise.all([...arrayRoomPromisses]).then((responses3) => {
      const rooms = responses3.filter((res) => res.data).map((res) => res.data);
      this.reservations = this.reservations.map((item) => {
        const roomValid = rooms.find((x) => x.id === item.roomId);
        return ({ ...item, roomType: roomValid});
      });
    });

  }

  onSelectDate(event) {
    console.log(event);

    this.currentDate = event;
  }

  onChangeIndexTab(event) {
    this.currentIndex = event;
  }

  onResetFilter() {
    this.getReservations();
    this.filterGuestName = '';
    this.currentDate = null;
    this.filterResId = null;
    this.filterStatus = 'ALL';
  }

  async onSearch() {
    if (!this.filterResId && !this.filterGuestName && !this.currentDate && this.filterStatus === 'ALL') {
      await this.getReservations();
      return;
    }
    await this.getReservations();
    console.log(this.reservations);

    const filter = {
      id: this.filterResId,
      reservationStatus: this.filterStatus === 'ALL' ? '' : this.filterStatus,
      guestName: this.filterGuestName,
      arrivalDate: this.currentDate ? moment(this.currentDate[0]).format('YYYY-MM-DD') : '',
      departureDate: this.currentDate ?  moment(this.currentDate[1]).format('YYYY-MM-DD') : '',
    };

    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
      }
    });
    this.reservations = this.reservations.filter(reservation => {
      // tslint:disable-next-line: forin
      for (const key in filter) {
        if (reservation[key] === undefined || !(reservation[key] + '').toLocaleLowerCase().includes('' + filter[key].toLocaleLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }

}
