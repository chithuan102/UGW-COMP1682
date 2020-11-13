import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppCoreService } from 'src/app/app.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {


  listOfData: any[] = [];
  listOfRoomType: any[] = [];

  isVisible = false;
  createForm: FormGroup;
  filterRoomNo = '';


  constructor(
    private appCoreService: AppCoreService,
    private fb: FormBuilder,
  ) {
    this.onCreateFormBuilder();
  }

  ngOnInit(): void {
    this.getRooms();
    this.getRoomType();
  }

  onCreateFormBuilder() {
    this.createForm = this.fb.group({
      roomCode: [null, [Validators.required]],
      roomType: [null, [Validators.required]],
    });
  }

  async getRoomType() {
    const response = await this.appCoreService.getRoomTypes();
    this.listOfRoomType = response.data.items;
    this.createForm.patchValue({
      roomType: this.listOfRoomType[0]
    })
    console.log(this.listOfRoomType);



  }

  async getRooms() {
    const response = await this.appCoreService.getRooms();
    this.listOfData = response.data.items;
    const arrayPromises = response.data.items.map(async (item: any) => await this.appCoreService.getReservationByRoom(item.id));
    Promise.all([...arrayPromises]).then((responses) => {
      const reservationValid = responses.filter((res) => res.data).map((res) => res.data);
      this.listOfData = this.listOfData.map((item) => {
        const findRes = reservationValid.find((x) => x.roomId === item.id);
        return findRes !== null ? ({ ...item, reservation: findRes }) : ({ ...item, reservation: null });
      });
      const arrayGuestPromises = reservationValid.map(async (item: any) => await this.appCoreService.getProfile(item.mainGuestId));
      Promise.all([...arrayGuestPromises]).then((responses2) => {
        const guests = responses2.filter((res) => res.data).map((res) => res.data);
        this.listOfData = this.listOfData.map((item) => {
          if (item.reservation) {
            const guestValid = guests.find((x) => x.id === item.reservation.mainGuestId);
            return ({ ...item, mainGuest: guestValid });
          }
          return item;
        });
        console.log(this.listOfData);
      });
    });
  }


  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    if (this.createForm.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    const data = this.createForm.getRawValue();
    const body = {
      ...data,
      roomType: {
        id: data.roomType.id
      }
    };
    const checkExist = this.listOfData.find((room) => room.roomCode === data.roomCode);
    if (checkExist) {
      this.appCoreService.error('Room Code already exist. Please input another roomCode');
      return;
    }

    const response = await this.appCoreService.createRoom(body);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getRooms();
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onStatusChange(event, data) {
    console.log(data);
    data.disabled = !event;
    console.log(data);
    this.appCoreService.updateRoom(data);

  }


  onResetFilter() {
    this.getRooms();
    this.filterRoomNo = '';
  }

  async onSearch() {
    if (!this.filterRoomNo) {
      await this.getRooms();
      return;
    }
    await this.getRooms();
    const filter = {
      roomCode: this.filterRoomNo
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
