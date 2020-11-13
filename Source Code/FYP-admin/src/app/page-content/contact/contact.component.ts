import { Component, OnInit } from '@angular/core';
import { AppCoreService } from 'src/app/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  listOfData: any[] = [];
  constructor(private appCoreService: AppCoreService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  async getContacts() {
    const reponse = await this.appCoreService.getContacts();
    this.listOfData = reponse.data.items;
  }

}
