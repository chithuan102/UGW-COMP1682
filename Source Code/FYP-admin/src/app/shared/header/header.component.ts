import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo;
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    userService.getUser().subscribe((user) => {
      this.userInfo = user;
    })
  }

  ngOnInit(): void {
    const fixedHeader = document.getElementsByClassName('fix-header')[0];
    fixedHeader.classList.add('content-wrapper');
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  showSidebar() {
    const fixedHeader = document.getElementsByClassName('fix-header')[0];
    if (fixedHeader.classList.contains('show-sidebar')) {
      fixedHeader.classList.remove('show-sidebar');
      return;
    }
    fixedHeader.classList.add('show-sidebar');
  }

}
