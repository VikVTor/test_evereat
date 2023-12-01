class ServerError extends Error {
    constructor(statusCode, ...args) {
        super(...args);
        this.statusCode = statusCode;
    }
}

class ClientError extends Error {
    constructor(statusCode, ...args) {
        super(...args);
        this.statusCode = statusCode;
    }
}

module.exports = {ServerError, ClientError};