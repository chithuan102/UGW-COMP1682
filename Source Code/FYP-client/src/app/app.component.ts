import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AppCoreService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FYP-client';
  constructor(
    private userService: UserService,
    private appCoreService: AppCoreService
  ) { }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'null') {
      this.appCoreService.getUserByToken({ accessToken }).then((response) => {
        if (response.code === 400) {
          localStorage.removeItem('accessToken')
          this.userService.setUser(null, '');
        } else {
          this.userService.setUser(response.data, accessToken);
        }

      });
    }
  }
}
