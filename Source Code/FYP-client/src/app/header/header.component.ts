import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppCoreService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user;

  constructor(
    private userCoreService: UserService,
    private router: Router, private appCoreService: AppCoreService) { }

  ngOnInit(): void {
    this.userCoreService.getUser().subscribe((user) => {
      this.user = user;
    });
  }


  openMenuMobile() {
    document.getElementById('offcanvas-menu-wrapper').classList.add('show-offcanvas-menu-wrapper');
    document.getElementById('offcanvas-menu-overlay').classList.add('active');
  }

  closeMenuMobile() {
    document.getElementById('offcanvas-menu-wrapper').classList.remove('show-offcanvas-menu-wrapper');
    document.getElementById('offcanvas-menu-overlay').classList.remove('active');
  }

  onLogout() {
    this.appCoreService.confirm('Are you wish to logout?').then((confirm) => {
      if (confirm.isConfirmed) {
        this.userCoreService.clearUser();
        this.router.navigate(['/']);
      }
    });
  }

}
