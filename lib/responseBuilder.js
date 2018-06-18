let response = {
    SUCCESS: (data, customMessage) => {
        return {code: 200, message: customMessage || "API Success", data: data || null};
    },
    ERROR: (err, customMessage) => {
        return {code: 510, message: customMessage || "Something went wrong", data: err || null};
    },
    NOT_AUTHORISED: (err, customMessage) => {
        return {code: 511, message: customMessage || "You are not authorised to view this property", data: err || null};
    },
    TOKEN_EXPIRED: (err, customMessage) => {
        return {code: 512, message: customMessage || "Access token is expired", data: err || null};
    },
    SERVER_TIMEDOUT: (err, customMessage) => {
        return {code: 513, message: customMessage || "Request timeout", data: err || null};
    }
}

module.exports = response;