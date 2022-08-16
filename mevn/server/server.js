const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config(); 
require('./db/config')
const app = express();
app.set('port', process.env.PORT || 3000);

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), () => { console.log(`http://localhost:${app.get('port')}, press Ctrl+C to quit`) });