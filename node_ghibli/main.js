const express = require('express');
const fs = require("fs-extra");
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/ghibli', function(req, res) {
    fs.readFile("ghibli.json", function(err,films){
var ret = JSON.parse(films)
        console.log(ret);
        res.json({ films: ret });
    })
});

app.listen(port, () => console.log(`listening on http://localhost/${port}`));