const mongoose = require("mongoose");

function getDatabaseUri(){
    if(process.env.PORT) return "mongodb://kha:123456kha@ds113853.mlab.com:13853/purtier";
    return "mongodb://localhost/myproject";
}
mongoose.connect(getDatabaseUri(),{ useNewUrlParser: true })
.then(() => console.log('Database connected!!'))
.catch(error => {
    console.log(error);
    process.exit(1);
});

