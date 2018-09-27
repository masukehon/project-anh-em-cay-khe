const express = require('express');
const { upload } = require('./helpers/multer');
const uploadAWS =  require('./helpers/uploadAWS');
const cors = require('cors');


const app = express();
app.use(cors());
app.set('view engine', 'ejs');

app.get('/upload', (req, res) => {
    res.render('test');
});
app.post('/upload', (req, res) => {
    const fieldsConfig = [
        { name: "banner", maxCount: 1 },
        { name: "centerImage", maxCount: 1 }
    ];
    upload.fields(fieldsConfig)(req, res, async error => {
        uploadAWS('fields', req.files, fieldsConfig)
        .then(images => res.send(images))
        .catch(error => res.send(error.message));
    });
});

app.listen(3000, () => console.log('Server started.'));