var mongoose = require("mongoose");
Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    nom: String,
    prenom: String,
    password: String,
});

mongoose.model("users", UserSchema);
// User est le nom de la collection dans mongodb en minuscules