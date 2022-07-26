require('./db/connect')
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/user')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(UserRouter)


app.listen(port, () => console.log(`http://localhost:${port}, press Ctrl+C to stop.`))