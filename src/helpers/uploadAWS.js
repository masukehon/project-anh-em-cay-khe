const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const ACCESSS_KEY_ID = 'AKIAJX2WRI7SQFHWNAXQ';
const SECRET_ACCESS_KEY = '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';
const BUCKET_NAME = 'purtier';

AWS.config.update({
    accessKeyId: ACCESSS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    subregion: 'us-east-1'
});

async function uploadAWS(name, file, fields){ //file = req.file
    if(name === 'single') {
        if(file) {
            const fileExtension = file.originalname.substring(file.originalname.lastIndexOf(".") + 1);
            const randomNumber = Math.floor(Math.random()*10000);
            const Key = Date.now()+randomNumber + '.' + fileExtension;
            const objectParams = { Bucket: BUCKET_NAME, Key, Body: file.buffer, ACL: 'public-read' };
            const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
            await uploadPromise;
            return Key;
        }
    }
    else if(name === 'array') {
        const arrKey = [];
        const arrPromise = file.map(f => {
            if(f) {
                const fileExtension = f.originalname.substring(f.originalname.lastIndexOf(".") + 1);
                const randomNumber = Math.floor(Math.random()*10000);
                const Key = Date.now()+randomNumber + '.' + fileExtension;
                const objectParams = { Bucket: BUCKET_NAME, Key, Body: f.buffer, ACL: 'public-read' };
                const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
                arrKey.push(Key);
                return uploadPromise;
            }
        });
        await Promise.all(arrPromise);
        return arrKey;
    }
    else if(name === 'fields') {
        const arrKey = [];
        const arrPromise = [];
        fields.forEach( field => {
            //{name, maxCount}
            // return console.log(field);
            const varName = field.name;
            const length = field.maxCount;
            if(file[varName]) {
                for(let i = 0; i < length; i++) {
                    const fileExtension = file[varName][i].originalname.substring(file[varName][i].originalname.lastIndexOf(".") + 1);
                    const randomNumber = Math.floor(Math.random()*10000);
                    const Key = Date.now()+randomNumber + '.' + fileExtension;
                    const objectParams = { Bucket: BUCKET_NAME, Key, Body: file[varName][i].buffer, ACL: 'public-read' };
                    const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
                    arrPromise.push(uploadPromise);
                    const obj = { varName: varName, filename:Key};
                    arrKey.push(obj);
                }
            }
        });

        await Promise.all(arrPromise);
        return arrKey;
    }
}

module.exports = uploadAWS;