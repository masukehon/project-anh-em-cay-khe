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
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJfaWQiOiI1YmExZjE0MjE5NThlYjE5NTBlZTNjMGEiLCJuYW1l
    IjoiQ2FvIFZpbmggS2hhIiwiZW1haWwiOiJtYXN1a2U5NkBnbWFp
    bC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCRtSFl3Wkc2a0t1MzVC
    ekxYZHdxOW1PSmR6QXRRMDF6bUp3MWlqZWNwd2pBYU5qYkJoNFBQ
    LiIsIl9fdiI6MCwiaWF0IjoxNTM3MzQwMjM3LCJleHAiOjE1Mzc1
    MTMwMzd9.x6DWQtqKmSy7_caoVvNVA0XDnjq1zrcWM7nuZANEnNo`;
}

module.exports = { verify, sign, getToken };