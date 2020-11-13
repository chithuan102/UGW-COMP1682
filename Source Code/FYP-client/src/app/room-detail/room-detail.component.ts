import { Component, OnInit } from '@angular/core';
import { AppCoreService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  selectedRoomType: any;
  roomTypes: any[] = [];
  dateRange: any[] = [];
  roomRate = 0;
  noOfGuest = 0;
  roomDetail = {
    id: 0,
    title: '',
    maxOccupancy: 0,
    thumbnail: '',
    description: '',
    area: '',
    bed: '',
    price: 0,
    roomServices: [],
    comments: [],
    banner: ''
  };
  rating = 0;
  comment = '';
  listComment: any[] = [];
  currentDateMili = moment(new Date(), 'YYYY-MM-DD 00:00:00').toDate().getTime();
  constructor(
    private appCoreService: AppCoreService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      if (params.id) {
        this.getRoomDetail(params.id);

      }
    })

  }

  ngOnInit(): void {
    this.getRoomTypes();
  }

  async getRoomDetail(id) {
    const response = await this.appCoreService.getRoomDetail(id);
    if (response.data) {
      this.roomDetail = response.data;
      const totalCommentRate = this.roomDetail.comments.reduce((cur, rev) => {
        return cur + rev.rate;
      }, 0);

      this.roomRate = totalCommentRate > 0 ? ((totalCommentRate / this.roomDetail.comments.length) + 5) / 2 : 5;
      this.getComment();
    }
  };


  submitReview() {
    this.userService.getUser().subscribe(async (user) => {
      if (!user) {
        this.appCoreService.error('You must login to submit review');
        return;
      }
      if (!this.comment) {
        this.appCoreService.error('Please input comment');
        return;
      }
      if (this.rating === 0) {
        this.appCoreService.error('Please select rating start');
        return;
      }
      const body = {
        roomType: {
          id: this.roomDetail.id
        },
        comment: this.comment,
        rate: this.rating,
        gender: user.gender,
        profile: {
          id: user.id,
        }
      };
      const response = await this.appCoreService.createComment(body);
      if (response.code === 200) {
        this.appCoreService.success('Create comment successfully');
        this.getRoomDetail(this.roomDetail.id);
        return;
      }
    });
  }


  async getComment() {
    const response = await this.appCoreService.getCommentByRoomTypeId(this.roomDetail.id);
    this.listComment = response.data.items;
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
    if (this.currentDateMili > this.dateRange[0].getTime()) {
      this.appCoreService.error('Cannot book room in the past');
      return;
    }
    if (this.dateRange[0].getTime() > this.dateRange[1].getTime()) {
      this.appCoreService.error('Invalid date');
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

  async getRoomTypes() {
    const response = await this.appCoreService.getRoomTypes();
    this.roomTypes = response.data.items;
    this.roomTypes.unshift({ title: 'ALL', id: 0 });
    this.selectedRoomType = this.roomTypes[0];

  }

  onSelectDate(event) {

  }

}
