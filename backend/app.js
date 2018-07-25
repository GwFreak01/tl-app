const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const CronJob = require('cron').CronJob;

const emailJob = new CronJob({
  // seconds, minutes, hours, days of month, months, days of week
  // cronTime: '00 00 20 * * 0-6'
  cronTime: '*/60 * * * * 0-6',
  onTick: function () {
    console.log('emailJob tick at: ', new Date());
  },
  start: false,
  timezone: 'America/New_York'

});
emailJob.start();

const companiesRoutes = require('./routes/companies');
const userRoutes = require('./routes/user');
const eventsRoutes = require('./routes/events');
const emailsRoutes = require('./routes/emails');


const app = express();

// mongoose.connect("mongodb+srv://gwfreak01:" + process.env.MONGO_ATLAS_PW + "@cluster0-s32lv.mongodb.net/tl-sms")
//   .then(() => {
//     console.log('Connected to cloud database!');
//   })
//   .catch(() => {
//     console.log('Connection failed!');
//   });

mongoose.connect('mongodb://localhost:27017/tlsmsdb_test')
  .then(() => {
    console.log('Connected to local database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  // res.header()

  next();
});

app.use('/api/companies', companiesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/emails', emailsRoutes);

module.exports = app;
