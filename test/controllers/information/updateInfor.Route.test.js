const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../src/app');
const { InformationService } = require('../../../src/services/information.service');
const { Information } = require('../../../src/models/information.model');

describe('test ../admin/infor/update',()=>{
    beforeEach('create infor for test', async () => {
        const infor = new Information({
        hotline:"12345",
        facebook:"fb",instagram:"ist",
        email:"nth@gmail",
        address:"nth",
        banner:"1.jpg",
        centerImage:'2.jpg'
         })
         infor.save();
    });
    it('can not update information ',async()=>{
        // const body = {
        //     hotline:"113",
        //     facebook:"fbHuu",
        //     instagram:"istHuu",
        //     email:"nguyentienhuu47@gmail",
        //     address:"ntasdh",
        //     banner:"baner.jpg",
        //     centerImage:'image.jpg'
        // }
    });
});