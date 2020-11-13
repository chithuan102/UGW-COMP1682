import { Component, OnInit } from '@angular/core';
import { AppCoreService } from '../app.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];

  constructor(private appService: AppCoreService) { }

  ngOnInit(): void {
    this.getRooms();
  }


  async getRooms() {
    const response = await this.appService.getRooms();
    const {items} = response.data;
    this.rooms = items;

  }

}
