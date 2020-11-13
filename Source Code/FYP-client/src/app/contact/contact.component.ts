import { Component, OnInit } from '@angular/core';
import { AppCoreService } from '../app.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  email;
  phone = null;
  address;
  name;
  message;

  constructor(private appCoreService: AppCoreService, private userService: UserService) {
    this.userService.getUser().subscribe((user) => {
      if (user && user !== 'null' && user !== 'undefine') {
        this.email = user.email;
        this.phone = user.phoneNumber;
        this.name = user.firstName + ' ' + user.lastName;
        this.address = user.address;
      }
    });

  }

  ngOnInit(): void {

  }





  async onPostContact() {
    const body = {
      email: this.email,
      phone: this.phone,
      address: this.address,
      name: this.name,
      message: this.message
    }
    console.log(body);
    
    if (!this.email || !this.phone || !this.address || !this.name || !this.message) {
      this.appCoreService.error('Please fill full information');
      return;
    }
  
    const response = await this.appCoreService.createContact(body);
    if (response.code === 200) {
      this.email = '';
      this.name = '';
      this.address = '';
      this.message = '';
      this.phone = 0;
      this.appCoreService.success('Send contact successfully');
    }
  }

}
