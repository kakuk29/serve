const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MEVN", {
    useNewUrlParser: true,

})
mongoose.connection.on('error', err => {
    logError(err);
  });