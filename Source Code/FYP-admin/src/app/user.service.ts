import { Injectable } from '@angular/core';
import { UserDetail } from './app.models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppCoreService } from './app.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    private messageSource = new BehaviorSubject(null);
    user = this.messageSource.asObservable();
    currentUser: any;
    listPermission: any;


    constructor(private router: Router, private appCoreService: AppCoreService) {
        this.user.subscribe((user) => {
            this.currentUser = user;
        });
    }


    setUser(user) {
        console.log(user);
        
        this.messageSource.next(user);
    }

    getUser() {
        return this.user;
    }

    clearUser() {
        this.user = null;
    }

    isUserExist() {
        return this.user !== null ? true : false;
    }

    async checkToken(): Promise<any> {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            this.router.navigate(['login']);
        }
        const getBodyInfo = {
            accessToken: token
        };
        const response2 = await this.appCoreService.getUserInfoByToken(getBodyInfo);
        if (response2.code === 400) {
            this.appCoreService.error(response2.message);
            this.router.navigate(['/login']);
            return;
        }
        const userInfo = response2.data;
        const listPermission = userInfo.role.permissions.map((permissions) => permissions.code);
        this.listPermission = listPermission;
        if (this.listPermission.length === 0) {
            this.router.navigate(['no-permission']);
            return;
        }

        localStorage.setItem('permissions', listPermission);
        this.setUser(userInfo);
        return userInfo;
    }

    hasPermission(permission) {

        if (this.currentUser.role.title === 'ADMIN') {

            return true;
        }
        return this.listPermission.includes(permission);
    }
}