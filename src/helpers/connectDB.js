const mongoose = require("mongoose");

function getDatabaseUri() {
    if (process.env.PORT) "mongodb://kha:123456kha@ds115283.mlab.com:15283/project-aeck";
    return "mongodb://localhost/myproject";
}
mongoose.connect(getDatabaseUri(), { useNewUrlParser: true })
    .then(() => console.log('Database connected!!'))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });

