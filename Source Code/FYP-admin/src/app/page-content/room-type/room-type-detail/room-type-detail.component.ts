import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCoreService } from 'src/app/app.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-room-type-detail',
  templateUrl: './room-type-detail.component.html',
  styleUrls: ['./room-type-detail.component.scss']
})
export class RoomTypeDetailComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  listServices: any[] = [];
  selectedServices: any[] = [];
  thumbnail: string;
  banner: string;

  isLoadingThumbnail = false;
  isLoadingBanner = false;

  roomTypeDetail = {
    id: 0,
    title: '',
    maxOccupancy: 0,
    thumbnail: '',
    banner: '',
    description: '',
    area: '',
    bed: '',
    price: 0,
    roomServices: [],
    comments: [],
    disabled: false,

  };
  isCreate = true;
  form: FormGroup;
  createForm: FormGroup;
  isVisible = false;
  status = true;
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private appCoreService: AppCoreService,
    private storage: AngularFireStorage,
    private modal: NzModalService) {
    this.getAllServices();
    this.onCreateFormBuilder();
    this.createForm = this.fb.group({
      username: [null, [Validators.required]],
      comment: [null, [Validators.required]],
      rate: [null, [Validators.required]],
      roomType: [null, [Validators.required]],


    });
    this.route.params.subscribe((params) => {
      if (params.id !== 'create') {
        console.log(params.id);
        this.getRoomTypeDetail(params.id);
        this.isCreate = false;
      } else {
        this.isCreate = true;
        this.onCreateFormBuilder();
      }
    });
  }
  ngOnInit(): void {
  }


  async getRoomTypeDetail(id) {
    const response = await this.appCoreService.getRoomTypeDetail(id);
    this.roomTypeDetail = response.data;
    console.log(this.roomTypeDetail);
    this.thumbnail = this.roomTypeDetail.thumbnail;
    this.banner = this.roomTypeDetail.banner;

    this.status = !this.roomTypeDetail.disabled;
    this.createForm.patchValue({ roomType: { id: this.roomTypeDetail.id } });
    this.onCreateFormBuilder();
  }


  onCreateFormBuilder() {
    this.form = this.fb.group({
      id: [this.roomTypeDetail.id, [, Validators.required]],
      title: [this.roomTypeDetail.title, [, Validators.required]],
      maxOccupancy: [this.roomTypeDetail.maxOccupancy, [, Validators.required]],
      thumbnail: [this.roomTypeDetail.thumbnail, [, Validators.required]],
      banner: [this.roomTypeDetail.banner, [, Validators.required]],

      description: [this.roomTypeDetail.description, [, Validators.required]],
      area: [this.roomTypeDetail.area, [, Validators.required]],
      bed: [this.roomTypeDetail.bed, [, Validators.required]],
      price: [this.roomTypeDetail.price, [, Validators.required]],
      roomServices: [this.roomTypeDetail.roomServices, []],
      comments: [this.roomTypeDetail.comments, []],
      disabled: [null, []],
    });
  }

  async getAllServices() {
    const response = await this.appCoreService.getAllService();

    this.listServices = response.data.items;
  }

  async onSave() {
    const data = this.form.getRawValue();
    delete data.comments;
    if (this.form.invalid) {
      this.appCoreService.error('Please fill full information');
      return;
    }
    if (this.isCreate) {
      const response = await this.appCoreService.createRoomType(data);
      if (response.code === 200) {
        this.appCoreService.success('Create room type success fully');
        this.router.navigate(['room-type']);
      }
    } else {
      const response = await this.appCoreService.updateRoomType({ ...data, disabled: !this.status });
      if (response.code === 200) {
        this.appCoreService.success('Update room type success fully');
        this.router.navigate(['room-type']);
      }
    }
  }

  onSelectServices(data) {

  }


  onStatusChange(event) {
    this.status = event;
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
    const response = await this.appCoreService.createComment(data);
    if (response.code === 200) {
      this.appCoreService.success('Create successfully');
      this.getRoomTypeDetail(this.roomTypeDetail.id);
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  delete(data): void {
    delete data.roomType;
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>This action cant revert.</b>',
      nzOnOk: async () => {
        const response = await this.appCoreService.deleteComment(data);
        if (response.code === 200) {
          this.appCoreService.success('Delete successfully');
          this.getRoomTypeDetail(this.roomTypeDetail.id);
        }
      }
    });
  }

  async onThumbnailChange(event) {
    this.isLoadingThumbnail = true;
    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    const filePath = id;
    const task = this.storage.upload(filePath, file).then(() => {
      const ref = this.storage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        this.thumbnail = url;
        this.form.patchValue({
          thumbnail: url
        });
        this.isLoadingThumbnail = false;

      });

    });
  }

  async onBannerChange(event) {
    this.isLoadingBanner = true;
    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    const filePath = id;
    const task = this.storage.upload(filePath, file).then(() => {
      const ref = this.storage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        this.banner = url;
        this.form.patchValue({
          banner: url
        });
        this.isLoadingBanner = false;

      });

    });
  }

  onBack() {
    window.history.back();
  }
}
