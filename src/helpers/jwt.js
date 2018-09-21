const jwt = require('jsonwebtoken');
const { ServerError } = require('../models/my-error.model');

const SECRET_KEY = 'qucsq384uqvd';

function sign(obj) {
    return new Promise((resolve, reject) => {
        obj = JSON.parse(JSON.stringify(obj))
        jwt.sign(obj, SECRET_KEY, { expiresIn: '2 days' }, (error, token) => {
            if (error) return reject(error);
            resolve(token);
        });
    });
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (error, obj) => {
            if (error) return reject(new ServerError("INVALID_TOKEN", 400));
            delete obj.exp;
            delete obj.iat;
            resolve(obj);
        });
    });
}

function getToken() {
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEzZDBhNGU5ZjI2NDAzODhmYWFlOTEiLCJuYW1lIjoiQ2FvIFZpbmggS2hhIiwiZW1haWwiOiJtYXN1a2U5NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCR0eXdWZmJxUlFjSmxPbGEzc3BMVDNlMUpmMlA3RGlPMWduUk5LdkFDb1hwbFVZcHRub2QyYSIsIl9fdiI6MCwicm9sZSI6IjViYTNjZTRlNmJlMzc4MjMyMDM2M2Y5YiIsImlhdCI6MTUzNzUxNTM5MCwiZXhwIjoxNTM3Njg4MTkwfQ.lv1CHtEkSsrxlPUYc5vhwFtybnxn45ytboIzlPPl1Xw`;
}

module.exports = { verify, sign, getToken };