require("./helpers/connectDB");
const express = require("express");
const json = require("body-parser");
const app = express();
const { siteRouter } = require("./controllers/site/site.route");

app.use(json());
app.use((req,res,next), ()=>{
    res.onError = error => {
        res.status(error.statusCode).send({success: false, message: error.message});
    };
    next();
});
app.use(siteRouter);

app.listen(3000,() => console.log('Server started!!'));