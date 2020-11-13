import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { AppCoreService } from 'src/app/app.service';
import { groupBy } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  week: Date;
  listOfStatus: any[] = [];
  reservations: any[] = [];
  rooms: any[] = [];


  toDayArrival;
  totalInhouse;
  totalCheckout;
  currrentDate = moment(new Date()).format('YYYY-MM-DD');
  revenueType = '7_DAYS';


  filterGuestName = '';
  filterResId = null;
  filterStatus = 'ALL';

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [];
  public barChartColors: Array<any> = [
    'rgb(255, 35, 35)',
    'rgb(255,114,114)',
    'rgb(249,181,107)',
    'rgb(238,215,107)',
    'rgb(255,217,65)',
    'rgb(0,187,149)',
    'rgb(0,228,189)',
    'rgb(107,238,212)'
  ]
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    // scales: { xAxes: [{}], yAxes: [{}] },
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', '#f5d57f', '#f283ef', '#83f2d8', '#f79388'],
    },
  ];

  constructor(
    private appCoreService: AppCoreService,
    private modal: NzModalService,


  ) {
    this.getReservations();
  }

  ngOnInit(): void {
    this.barChartData[0] = { data: [0, 0, 0, 0, 0, 0, 0], label: 'Revenue' };
    // this.barChartData[0] = { data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Total Messages' };
    // this.barChartData[1] = { data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Message Sended' };
    // tslint:disable-next-line:max-line-length
    // this.barChartData[2] = { data: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Message Received' };
    this.getAllRooms();
    this.getReporByDate('7_DAYS');
  }

  getWeek(result: Date): void {

  }


  async getReservations() {
    const currentDateString = moment().format('YYYY-MM-DD');
    const response = await this.appCoreService.getReservations();
    this.reservations = response.data.items
      .filter(reservation => (
        reservation.reservationStatus === 'INHOUSE' || reservation.reservationStatus === 'ARRIVAL')
        && ((reservation.arrivalDate === currentDateString && reservation.reservationStatus !== 'INHOUSE')
          || (reservation.departureDate === currentDateString && reservation.reservationStatus === 'INHOUSE'))
      );
  }
  checkin() {

  }

  checkOut(reservation) {
    const price = reservation.transactions.reduce((prev, cur) => {
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
          const response = await this.appCoreService.checkoutReservation(reservation);
          if (response.code === 200) {
            this.appCoreService.success('Checkout successfully');
            this.getReservations();
          }
        }
      });
    }
  }

  async checkIn(reservation) {
    const response = await this.appCoreService.checkInReservation(reservation);
    if (response.code === 200) {
      this.appCoreService.success('Checkin successfully');
      this.getReservations();
    }
  }

  async getAllRooms() {
    const response = await this.appCoreService.getRooms();
    if (response.code === 200) {
      this.rooms = response.data.items;
      const setOfLabel = new Set<string>();
      this.rooms.filter((room) => setOfLabel.add(room.roomType.title));
      const availableRooms = this.rooms.filter((room) => room.roomStatus === 'AVAILABLE');
      const counts = availableRooms.reduce((p, c) => {
        const name = c.roomType.title;
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});

      const countsExtended = Object.keys(counts).map(k => {
        return { name: k, count: counts[k] };
      });
      console.log(countsExtended);

      countsExtended.forEach((obj) => {
        this.pieChartLabels.push(obj.name + ': ' + obj.count);
        this.pieChartData.push(obj.count);
      });
    }
  }

  onResetFilter() {
    this.getReservations();
    this.filterGuestName = '';
    this.filterResId = null;
    this.filterStatus = 'ALL';
  }

  async onSearch() {
    if (!this.filterResId && !this.filterGuestName && this.filterStatus === 'ALL') {
      await this.getReservations();
      return;
    }
    await this.getReservations();
    console.log(this.reservations);

    const filter = {
      id: this.filterResId,
      reservationStatus: this.filterStatus === 'ALL' ? '' : this.filterStatus,
      guestName: this.filterGuestName,
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


  async getReporByDate(type) {
    const body = {
      type,
      date: moment().format('YYYY-MM-DD')
    };
    const response = await this.appCoreService.getReport(body);

    const data = response.data.items;
    const data7days = [];
    this.barChartLabels = [];
    this.barChartData[0] = {};

    data.filter((item) => {
      this.barChartLabels.push(item.date);
      data7days.push(item.revenue);
    });
    this.barChartData[0] = {
      data: [...data7days], label: 'Revenue', backgroundColor: [
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        'rgb(0,228,189)',
        'rgb(107,238,212)',
        'rgb(255, 35, 35)',
        'rgb(255,114,114)',
        'rgb(249,181,107)',
        'rgb(238,215,107)',
        'rgb(255,217,65)',
        'rgb(0,187,149)',
        ,
      ],
    };
  }
}
