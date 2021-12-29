const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const fakerData = require('./models/faker-scripts')

mongoose.connect('mongodb://localhost/users_api')
const db = mongoose.connection;
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json());

const usersQuarry = require('./routes/usersQuarry')
app.use('/', usersQuarry)

app.listen(3000, () => console.log('server started'))
