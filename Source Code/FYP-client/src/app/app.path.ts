export const END_POINT = {
    PROFILE: {
        GET_DETAIL: '/profile/info/',
        UPDATE: '/profile/info/',
        CREATE: '/profile/signUp',
        GET: '/profile',
        DELETE: '/profile/',
        LOGIN: '/profile/login',
        CHANGE_PASSWORD: '/profile/changePassword',
        HISTORY: '/profile/history/',
        BY_TOKEN: '/profile/info/by-token',
        SEND_MAIL: '/profile/resend',
    },
    ROLE: {
        GET_ROLES: '/groupPermissions',
        GET_DETAIL: '/groupPermissions/',

    },
    ROOM: {
        GET_ROOM: '/room',
        GET_DETAIL: '/room',
        GET_AVAILABLE_ROOM: '/room/available',
    },
    ROOM_TYPE: {
        GET_ROOM: '/room-type',
        GET_DETAIL: '/room-type',
    },
    HOTEL: {
        GET_HOTEL: '/hotel/info',
        GET_DETAIL: '/hotel',
    },
    RESERVATION: {
        GET_HOTEL: '/reservation',
        GET_DETAIL: '/reservation',
        CREATE: '/reservation',

    },
    COMMENT: {
        DEFAULT: '/comment',
        BY_ROOM_TYPE: '/comment/room-type',
    },
    CONTACT: {
        DEFAULT: '/contact',
    },
    PAYMENT: {
        DEFAULT: '/payment',
        HOOK: '/payment/hook'
    },
   
    STATIC_PATH: 'http://api.com1640.tk/static/'
};

export const METHOD_TYPE = {
    GET: 'GET',
    DELETE: 'DELETE',
    POST: 'POST',
    PUT: 'PUT',
}
