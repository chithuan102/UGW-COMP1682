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
            items: JSON.parse(JSON.stringify(response.data).replace(/\:null/gi, '\:""'))
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

export interface IConfirm {
    isConfirmed: boolean;
    isDismissed: boolean;
    value: boolean;
}
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

    async getAllTransactionCode() {
        return await this.callApi(END_POINT.TRANSACTION_CODE.DEFAULT, METHOD_TYPE.GET,);
    }

    async createTransactionCode(body) {
        return await this.callApi(END_POINT.TRANSACTION_CODE.DEFAULT, METHOD_TYPE.POST, body);
    }


    async deleteTransactionCode(body) {
        return await this.callApi(END_POINT.TRANSACTION_CODE.DEFAULT + '/' + body.id, METHOD_TYPE.DELETE);
    }

    async deleteFolioTransaction(body) {
        return await this.callApi(END_POINT.RESERVATION.CREATE_TRANSACTION + '/' + body.id, METHOD_TYPE.DELETE);
    }

    async createFolioTransaction(body) {
        return await this.callApi(END_POINT.RESERVATION.CREATE_TRANSACTION, METHOD_TYPE.POST, body);
    }


    async getReservations() {
        return await this.callApi(END_POINT.RESERVATION.DEFAULT, METHOD_TYPE.GET);
    }

    async getReservationDetail(id) {
        return await this.callApi(END_POINT.RESERVATION.DEFAULT + '/' + id, METHOD_TYPE.GET);
    }

    async checkoutReservation(body) {
        return await this.callApi(END_POINT.RESERVATION.CHECK_OUT + '/' + body.id, METHOD_TYPE.PUT);
    }

    async checkInReservation(body) {
        return await this.callApi(END_POINT.RESERVATION.CHECK_IN + '/' + body.id, METHOD_TYPE.PUT);
    }

    async cancelReservation(body) {
        return await this.callApi(END_POINT.RESERVATION.CANCEL, METHOD_TYPE.PUT, body);
    }

    async changeRoom(body) {
        return await this.callApi(END_POINT.RESERVATION.CHANGE_ROOM, METHOD_TYPE.POST, body);
    }
    async addGuest(body) {
        return await this.callApi(END_POINT.RESERVATION.ADD_GUEST, METHOD_TYPE.POST, body);
    }

    async updateRerservation(body) {
        return await this.callApi(END_POINT.RESERVATION.DEFAULT, METHOD_TYPE.PUT, body);
    }

    async getProfile(id) {
        return await this.callApi(END_POINT.PROFILE.DEFAULT + '/' + id, METHOD_TYPE.GET);
    }


    async getRoomType(id) {
        return await this.callApi(END_POINT.ROOM_TYPE.DEFAULT + '/' + id, METHOD_TYPE.GET);
    }

    async getRooms() {
        return await this.callApi(END_POINT.ROOM.GET_ALL, METHOD_TYPE.GET);
    }

    async createRoom(data) {
        return await this.callApi(END_POINT.ROOM.GET_ALL, METHOD_TYPE.POST,data);
    }

    async updateRoom(data) {
        return await this.callApi(END_POINT.ROOM.GET_ALL, METHOD_TYPE.PUT, data);
    }

    async getReservationByRoom(id) {
        return await this.callApi(END_POINT.ROOM.RESERVATION_BY_ROOM + '/' + id, METHOD_TYPE.GET);
    }

    async getAllProfile() {
        return await this.callApi(END_POINT.PROFILE.GET_ALL, METHOD_TYPE.GET);
    }
    async updateProfileDetail(body) {
        return await this.callApi(END_POINT.PROFILE.DEFAULT + '/' + body.id, METHOD_TYPE.PUT, body);
    }
    async createProfileDetail(body) {
        return await this.callApi(END_POINT.PROFILE.DEFAULT , METHOD_TYPE.POST, body);
    }

    async getUsers() {
        return await this.callApi(END_POINT.USER.DEFAULT, METHOD_TYPE.GET);
    }

    async getUserDetail(token) {
        return await this.callApi(END_POINT.USER.DEFAULT, METHOD_TYPE.GET);
    }

    async createUser(body) {
        return await this.callApi(END_POINT.USER.DEFAULT, METHOD_TYPE.POST, body);
    }

    async updateUser(body) {
        return await this.callApi(END_POINT.USER.DEFAULT, METHOD_TYPE.PUT, body);
    }

    async deleteUser(body) {
        return await this.callApi(END_POINT.USER.DEFAULT + '/' + body.id, METHOD_TYPE.DELETE);
    }

    async getRoles() {
        return await this.callApi(END_POINT.ROLE.DEFAULT, METHOD_TYPE.GET);
    }

    async getReport(body) {
        return await this.callApi(END_POINT.REPORT.DEFAULT, METHOD_TYPE.POST,body);
    }

    async deleteRole(body) {
        return await this.callApi(END_POINT.ROLE.DEFAULT + '/' + body.id, METHOD_TYPE.DELETE);
    }

    async getRoleDetail(id) {
        return await this.callApi(END_POINT.ROLE.DEFAULT + '/' + id, METHOD_TYPE.GET);
    }

    async updateRoleDetail(body) {
        return await this.callApi(END_POINT.ROLE.DEFAULT, METHOD_TYPE.PUT, body);
    }

    async createRole(data) {
        return await this.callApi(END_POINT.ROLE.DEFAULT, METHOD_TYPE.POST, data);
    }

    async getPermissions() {
        return await this.callApi(END_POINT.PERMISSION.DEFAULT, METHOD_TYPE.GET);
    }

    async getRoomTypes() {
        return await this.callApi(END_POINT.ROOM_TYPE.DEFAULT, METHOD_TYPE.GET);
    }


    async createRoomType(data) {
        return await this.callApi(END_POINT.ROOM_TYPE.DEFAULT, METHOD_TYPE.POST, data);
    }
    async updateRoomType(data) {
        return await this.callApi(END_POINT.ROOM_TYPE.DEFAULT, METHOD_TYPE.PUT, data);
    }

    async getRoomTypeDetail(id) {
        return await this.callApi(END_POINT.ROOM_TYPE.DEFAULT + '/' + id, METHOD_TYPE.GET);
    }


    async bookingHistory(body) {
        return await this.callApi(END_POINT.PROFILE.HISTORY + body.id, METHOD_TYPE.GET);
    }


    async getAllService() {
        return await this.callApi(END_POINT.SERVICE.DEFAULT, METHOD_TYPE.GET);
    }


    async createService(body) {
        return await this.callApi(END_POINT.SERVICE.DEFAULT, METHOD_TYPE.POST, body);
    }

    async updateService(body) {
        return await this.callApi(END_POINT.SERVICE.DEFAULT, METHOD_TYPE.PUT, body);
    }


    async deleteService(body) {
        return await this.callApi(END_POINT.SERVICE.DEFAULT, METHOD_TYPE.DELETE, body);
    }

    async createComment(data) {
        return await this.callApi(END_POINT.COMMENT.DEFAULT, METHOD_TYPE.POST, data);
    }

    async deleteComment(data) {
        return await this.callApi(END_POINT.COMMENT.DEFAULT, METHOD_TYPE.DELETE,data);
    }

    async getCommentByRoomTypeId(id) {
        return await this.callApi(END_POINT.COMMENT.DEFAULT + '/' + id , METHOD_TYPE.GET);
    }

    async getContacts() {
        return await this.callApi(END_POINT.CONTACT.DEFAULT , METHOD_TYPE.GET);
    }


    async onLogin(body) {
        return await this.callApi(END_POINT.USER.LOGIN , METHOD_TYPE.POST, body);
    }

    async getUserInfoByToken(body) {
        return await this.callApi(END_POINT.USER.INFO , METHOD_TYPE.POST, body);
    }

    uploadFile(file: File): Promise<ApiResponse> {
        const fromData = new FormData();
        fromData.append('file', file);
        return new Promise((resolve, reject) => {
            this.http
                .post(this.host + '/upload', fromData)
                .toPromise()
                .then(response => {
                    return resolve(getResponseData(response));
                })
                .catch((error: any) => {
                    return reject(getResponseError(error));
                });
        });
    }

    success(message?, title?) {
        this.toastService.success(message ? message : 'Success', title ? title : 'Notify');
    }


    error(message?, title?) {
        this.toastService.error(message ? message : 'Invalid', title ? title : 'Notify');
    }

    errorMissingValue() {
        this.toastService.error('Please fill full information',  'Notify');
    }

    async sendMail(body) {
        return await this.callApi('/send-mail', METHOD_TYPE.POST, body);
    }



    confirm(text): Promise<any> {
        return Swal.fire({
            title: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });
    }

}
