const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config(); 
require('./db/connect')

const app = express();
app.set('port', process.env.PORT || 3000);
const userRoutes = require('./router/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);


app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}, press Ctrl+C to quit`);
}); 