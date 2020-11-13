import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCoreService } from 'src/app/app.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {

  listOfData: any[] = [];
  filterName = '';

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private appCoreService: AppCoreService) { }

  ngOnInit(): void {
    this.getAllRoomType();
  }

  delete(data) {

  }

  async getAllRoomType() {
    const response = await this.appCoreService.getRoomTypes();
    this.listOfData = response.data.items;
  }

  async onStatusChange(event, data) {
    data.disabled = !event;
    delete data.comments;
    delete data.roomServices;

    const response = await this.appCoreService.updateRoomType(data);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      // this.getAllRoomType();
    } else {
      data.disabled = false;
    }
  }

  onResetFilter() {
    this.getAllRoomType();
    this.filterName = '';
  }

  async onSearch() {
    if (!this.filterName) {
      await this.getAllRoomType();
      return;
    }
    await this.getAllRoomType();
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
