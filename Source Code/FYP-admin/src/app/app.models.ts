export enum MethodType {
    GET,
    PUST,
    POST,
    DELETE,
}

export interface ApiResponse {
    code?: number;
    data?: any;
    message?: string;
    status?: any;
}

export interface IModel {
    id?: number;
}

export interface User extends IModel {
    fullName?: any;
    firstName?: any;
    lastName?: any;
    address?: any;
    phoneNumber?: any;
    paymentType?: any;
    paymentId?: any;
    googleId?: any;
    password?: any;
    activated?: any;
    email?: any;
    role?: any;
}

export class UserDetail implements User {
    constructor(
        public fullName?: string,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
        public phoneNumber?: string,
        public paymentType?: string,
        public paymentId?: string,
        public googleId?: string,
        public password?: string,
        public activated?: boolean,
        public email?: string,
        public role?: any,
        public id?: number,
    ) { }
}

