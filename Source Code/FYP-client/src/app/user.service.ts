import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppCoreService } from './app.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    private messageSource = new BehaviorSubject(null);
    user = this.messageSource.asObservable();
    currentUser: any;

    constructor(private router: Router, private coreService: AppCoreService) {
        this.user.subscribe((user) => {
            this.currentUser = user;
        });
    }


    setUser(user, accessToken) {
        this.messageSource.next(user);
        localStorage.setItem('accessToken', accessToken);
    }
    setUserOnly(user) {
        this.messageSource.next(user);
    }

    getUser() {
        return this.user;
    }

    clearUser() {
        this.setUser(null, '');
    }

    isUserExist() {
        return this.user !== null ? true : false;
    }

    async checkToken(): Promise<any> {
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     this.router.navigate(['login']);
        // }
        // const userLocalStore = localStorage.getItem('user');
        // if (userLocalStore) {
        //     this.setUser(JSON.parse(userLocalStore));
        // }
        // const responseUser = await this.coreService.getUserDetail(token.split('_', 1)[0]);
        // if (responseUser.code) {
        //     this.router.navigate(['login']);
        //     return;
        // }
        // if (!responseUser.data.status) {
        //     this.router.navigate(['login']).then(() => {
        //         this.coreService.error('Your account is blocked currently. Please contact your admin to get more about this action.');
        //         return;
        //     });
        //     return;
        // }
        // const user = {
        //     ...responseUser.data,
        //     token: token.split('_').pop()
        // };
        // this.setUser(user);
    }

    hasPermission(role) {

        // return true;
        if (!role || role.length === 0) {
            return true;
        }
        return role.length > 0 && role.includes(this.currentUser.role);
    }
}