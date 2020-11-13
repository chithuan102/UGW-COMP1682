import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import * as moment from 'moment';
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
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})

export class ReservationTableComponent implements OnInit {
  @Input() reservations: any[] = [];
  @Input() reservationStatus: any;

  @Input() set currentDate(date: Date) {
    if (this.reservationStatus) {
      if (this.reservationStatus === 'ARRIVAL') {
        const dateString = moment(date).format('YYYY-MM-DD');
        console.log(date);
        console.log(this.listOfData);
        this.listOfData = this.reservations.filter((res) => res.reservationStatus === this.reservationStatus && res.arrivalDate === dateString);
      } else {
        this.listOfData = this.reservations.filter((res) => res.reservationStatus === this.reservationStatus);
      }
    } else {
      this.listOfData === this.reservations;
    }
  }



  listOfData: any[] = [
    {
      id: '1',
      confirmationNo: 'John Brown',
      guestName: 32,
      roomNo: 1001,
      person: 2,
      arrivalDate: '2020-05-01',
      departureDate: '2020-05-02',
    },
  ];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Res. Id',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      name: 'Guest Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      name: 'Persons',
    },
    {
      name: 'Room Type',
    },
    {
      name: 'Room Id',
    },
    {
      name: 'Res. Status',
    },
    {
      name: 'Arrival',
    },
    {
      name: 'Departure',
    },
    {
      name: 'Balance',
    },
  ];

  constructor() { }

  ngOnInit(): void {

  }



  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => {
      item.sortOrder = null;
    });
    this.resetFilters();
  }

  resetFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {
        item.listOfFilter = [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' }
        ];
      } else if (item.name === 'Address') {
        item.listOfFilter = [
          { text: 'London', value: 'London' },
          { text: 'Sidney', value: 'Sidney' }
        ];
      }
    });
  }

  caculateBalance(transactions: any[]) {
    return transactions.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
  }


  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Age') {
        item.sortOrder = 'descend';
      } else {
        item.sortOrder = null;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reservations) {
      if (this.reservationStatus) {
        this.listOfData = this.reservations.filter((res) => res.reservationStatus === this.reservationStatus);
      } else {
        this.listOfData = this.reservations;
      }
    }

  }

}
