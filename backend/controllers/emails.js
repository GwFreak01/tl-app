const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const mailgunTransport = require('nodemailer-mailgun-transport');
const fs = require('fs');
const moment = require('moment');
const path = require('path');





const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
};

const readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

// MailGun Config
// const transport = mailgunTransport(mailgunOptions);

// Local Mail Config
const transport = {
  host: 'tandlautomatics.com',
  port: '25',
  secure: false, // true for 465, false for other ports
};




// const emailClient = nodemailer.createTransport(transport);

const emailClient = nodemailer.createTransport(transport);

emailClient.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is ready to take our messages');
  }

});

exports.sendEmail = (req, res, next) => {

  console.log('ReqBodyEmails: ', req.body.company);
  const emailList = [];
  if (req.body.company.salesPerson.status) {
    emailList.push(req.body.company.salesPerson.email);
  }
  if (req.body.company.qualityPerson.status) {
    emailList.push(req.body.company.qualityPerson.email);
  }
  if (req.body.company.logisticsPerson.status) {
    emailList.push(req.body.company.logisticsPerson.email);
  }
  if (req.body.company.differentPerson.status) {
    emailList.push(req.body.company.differentPerson.email);
  }

  console.log('emailList: ', emailList);
  console.log('affectedEvents: ', req.body.events);


  readHTMLFile(path.join(__dirname, '../models/html_templates/companyReport.html'), function (err, html) {


    const replacements = {
      eventItems: req.body.events
    };

    handlebars.registerHelper('ifEventBad', function (a,b, options) {
      console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });
    handlebars.registerHelper('ifEventMid', function (a,b, options) {
      console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });

    handlebars.registerHelper('ifEventGood', function (a,b, options) {
      console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });

    handlebars.registerHelper('ifGreen', function (a,b, options) {
      const start = new Date();
      const end = new Date(new Date(start).setMonth(start.getMonth() - 12));
      console.log('startDate: ', start);
      console.log('endDate: ', end);

      console.log('eventDate', Date.parse(req.body.events[0].eventDate) <= start);
      let num = req.body.events
        .filter(events => Date.parse(events.eventDate) <= start || Date.parse(events.eventDate) >= end)
        .filter(events => events.statusOption === 'Open' || events.statusOption === 'Pending');
      console.log(num, num.length);

      if (num.length < 2) {
        console.log('GREEN');
        return '<font color="#66BB6A"><b>GREEN</b></font>.<br><br>\n' +
          'Thank you for your ongoing support.';
      } else if (num.length >= 2 || num.length <= 4) {
        console.log('YELLOW');
        return '<font color="#FFEE58"><b>YELLOW</b></font>.<br><br>\n' +
          'Please review all corrective actions on past issues and proactively look for common issues.\n';
      } else if (num.length > 4) {
        console.log('RED');
        return '<font color="#EF5350"><b>RED</b></font>.<br><br>\n' +
          'T&L QA will be contacting you to discuss an improvement plan.\n';
      }
    });

    handlebars.registerHelper('formatTime', function (date, format) {
      const mmnt = moment(date);
      return mmnt.format(format);
    });


    const template = handlebars.compile(html);

    const htmlToSend = template(replacements);

    const mailContents = {
      from: 'bill@tandlautomatics.com',
      text: 'Email Reports from T&L Automatics',
      html: htmlToSend
    };


    emailList.forEach(function (email, i, array) {
      mailContents.to = email;
      mailContents.subject = 'Quarterly Supplier Report';
      // console.log(mailContents);

      emailClient.sendMail(mailContents, function (err, info) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(i);
          console.log('Message sent: %s %s', info.messageId, i);
          // Preview only available when sending through an Ethereal account
          // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        }

        if (i === emailList.length - 1) {
          // mailContents.transport.close();
          return res.status(200).json({
            message: 'Emails sent successfully!'
          });
        }
      });
    });

  });


};

exports.sendCompanyRegistration = (req, res, next) => {
  console.log(req.body.email);


  readHTMLFile(path.join(__dirname, '../models/html_templates/companyRegistrationEmail.html'), function (err, html) {
    var template = handlebars.compile(html);


    const mailContents = {
      from: 'bill@tandlautomatics.com',
      to: req.body.email,
      text: 'Company Registration Email from T&L Automatics',
      subject: 'New Company Registration - T&L Supplier Management System',
      html: html
    };

    emailClient.sendMail(mailContents, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: 'Emails sent failed!'
        });
      } else {
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      }
      // mailContents.transport.close();
      return res.status(200).json({
        message: 'Emails sent successfully!'
      });

    });

  });


};
