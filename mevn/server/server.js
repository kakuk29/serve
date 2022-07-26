require('./db/connect')
const cors = require('cors');
const dotenv = require("dotenv");
const express = require('express')
dotenv.config(); 


const app = express();
app.set('port', process.env.PORT || 3000);
const UserRouter = require('./router/user');

app.use(cors());
app.use(express.json());
app.use(UserRouter);


app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}, press Ctrl+C to quit`);
});