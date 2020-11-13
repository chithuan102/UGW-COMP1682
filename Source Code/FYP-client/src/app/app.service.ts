import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiResponse, MethodType } from './app.models';
import { END_POINT, METHOD_TYPE } from './app.path';
import { ToastrService } from 'ngx-toastr';
export const getResponseData = (response: any): ApiResponse => {
    const { code, message } = response;
    let data;
    if (response.data instanceof Array) {
        data = {
            items: response.data
        };
    } else {
        data = response.data;
    }

    return {
        data,
        message,
        status: code,
        code,
    };
};
export const getResponseError = (response: any): ApiResponse => {
    const { status, data } = response;
    return {
        status,
        data,
    };
};
@Injectable({ providedIn: 'root' })
export class AppCoreService {

    host = 'http://localhost:1998';


    constructor(private http: HttpClient, private toastService: ToastrService) { }

    public callApi(path: string, method: string, requestData?: any): Promise<ApiResponse> {
        let options: any;
        if (method === 'GET') {
            options = {
                params: requestData
            };
        } else {
            options = {
                body: requestData
            };
        }

        return new Promise((resolve, reject) => {
            this.http
                .request<any>(method, this.host + path, options)
                .toPromise()
                .then((response: any) => {
                    if (response.code !== 200 && response.code !== 400) {
                        this.error('HAS ERROR');
                    }
                    return resolve(getResponseData(response));
                })
                .catch((error: any) => {
                    this.error('SERVER ERROR');
                    return reject(getResponseError(error));
                });
        });
    }

    async login(data) {
        return await this.callApi(END_POINT.PROFILE.LOGIN, METHOD_TYPE.POST, data);
    }

    async getUsers(params) {
        return await this.callApi(END_POINT.PROFILE.GET_DETAIL, METHOD_TYPE.GET, params);
    }
    async getUserByToken(body) {
        return await this.callApi(END_POINT.PROFILE.BY_TOKEN, METHOD_TYPE.POST, body);
    }

    async getUserDetail(id) {
        return await this.callApi(END_POINT.PROFILE.GET_DETAIL + id, METHOD_TYPE.GET);
    }

    async updateUserDetail(body) {
        return await this.callApi(END_POINT.PROFILE.UPDATE + body.id, METHOD_TYPE.PUT, body);
    }

    async changeUserPassword(body) {
        return await this.callApi(END_POINT.PROFILE.CHANGE_PASSWORD, METHOD_TYPE.PUT, body);
    }

    async createUser(body) {
        return await this.callApi(END_POINT.PROFILE.CREATE, METHOD_TYPE.POST, body);
    }

    async deleteUser(body) {
        return await this.callApi(END_POINT.PROFILE.DELETE + body.id, METHOD_TYPE.DELETE);
    }

    async bookingHistory(body) {
        return await this.callApi(END_POINT.PROFILE.HISTORY + body.id, METHOD_TYPE.GET);
    }

    async getRooms() {
        return await this.callApi(END_POINT.ROOM_TYPE.GET_ROOM, METHOD_TYPE.GET);
    }

    async getRoomTypes() {
        return await this.callApi(END_POINT.ROOM_TYPE.GET_ROOM, METHOD_TYPE.GET);
    }

    async getHotelInfo() {
        return await this.callApi(END_POINT.HOTEL.GET_HOTEL, METHOD_TYPE.GET);
    }

    async getAvailableRoom(body) {
        return await this.callApi(END_POINT.ROOM.GET_AVAILABLE_ROOM, METHOD_TYPE.POST, body);
    }

    async getRoomDetail(roomCode) {
        return await this.callApi(END_POINT.ROOM_TYPE.GET_DETAIL + '/' + roomCode, METHOD_TYPE.GET);
    }

    async createReservation(body) {
        return await this.callApi(END_POINT.RESERVATION.CREATE, METHOD_TYPE.POST, body);
    }
    async paymentHook(body) {
        return await this.callApi(END_POINT.PAYMENT.HOOK, METHOD_TYPE.POST, body);
    }

    async createComment(body) {
        return await this.callApi(END_POINT.COMMENT.DEFAULT, METHOD_TYPE.POST, body);
    }

    async getCommentByRoomTypeId(id) {
        return await this.callApi(END_POINT.COMMENT.BY_ROOM_TYPE + '/' + id, METHOD_TYPE.GET);
    }

    async createContact(body) {
        return await this.callApi(END_POINT.CONTACT.DEFAULT, METHOD_TYPE.POST, body);
    }

    success(message?, title?) {
        this.toastService.success(message ? message : 'Success', title ? title : 'Notify');
    }


    error(message?, title?) {
        this.toastService.error(message ? message : 'Invalid', title ? title : 'Notify');
    }

    async sendMail(email) {
        return await this.callApi(END_POINT.PROFILE.SEND_MAIL + '/' + email, METHOD_TYPE.GET);
    }



    confirm(text): Promise<any> {
        return Swal.fire({
            title: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        });
    }

}
