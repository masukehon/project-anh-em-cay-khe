const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/myproject",{ useNewUrlParser: true })
.then(() => console.log('Database connected!!'))
.catch(error => {
    console.log(error);
    process.exit(1);
});

