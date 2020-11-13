import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  hasViewDashboard;
  constructor(private userService: UserService) { 
    this.hasViewDashboard = this.userService.hasPermission('VIEW_DASHBOARD');
    console.log(this.hasViewDashboard);
    
  }
  

  ngOnInit(): void {
  }

}
