export const END_POINT = {
    TRANSACTION_CODE: {
        DEFAULT: '/transaction-code'
    },
    RESERVATION: {
        DEFAULT: '/reservation',
        CHECK_OUT: '/reservation/checkout',
        CHECK_IN: '/reservation/checkin',
        CANCEL: '/reservation/cancalled',
        CHANGE_ROOM: '/reservation/change-room',
        ADD_GUEST: '/reservation/add-guest',



        CREATE_TRANSACTION: '/reservation/transaction',



    },
    PROFILE: {
        DEFAULT: '/profile/info',
        GET_ALL: '/profile',
        HISTORY: '/profile/history/'
    },
    ROOM_TYPE: {
        DEFAULT: '/room-type'
    },
    ROOM: {
        DEFAULT: '/room',
        GET_ALL: '/room/physicalRoom',
        RESERVATION_BY_ROOM: '/room/reservation'

    },
    USER: {
        DEFAULT: '/user',
        LOGIN: '/user/login',
        INFO: '/user/info',
    },
    ROLE: {
        DEFAULT: '/role'
    },
    PERMISSION: {
        DEFAULT: '/role/permission'
    },
    SERVICE: {
        DEFAULT: '/room-service'
    },
    COMMENT: {
        DEFAULT: '/comment'
    },
    REPORT: {
        DEFAULT: '/report'
    },
    CONTACT: {
        DEFAULT: '/contact'
    }
};

export const METHOD_TYPE = {
    GET: 'GET',
    DELETE: 'DELETE',
    POST: 'POST',
    PUT: 'PUT',
}
