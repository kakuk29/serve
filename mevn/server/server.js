require('./db/connect')
const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(port, () => { console.log('Server is running on http://localhost:' + port + ', press Ctrl+C to stop, or Ctrl+Shift+C to quit.'); })