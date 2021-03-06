const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const mailgunTransport = require('nodemailer-mailgun-transport');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const Company = require('../models/company');
const Event = require('../models/event');


const CronJob = require('cron').CronJob;
const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
};



// MailGun Config

// let transport = mailgunTransport(mailgunOptions);

// Local Mail Config
let transport = {
  host: '10.220.36.5',
  port: '25',
  secure: false, // true for 465, false for other ports
};




// const emailClient = nodemailer.createTransport(transport);

let emailClient = nodemailer.createTransport(transport);
emailClient.verify(function (error, success) {
  if (error) {
    transport = mailgunTransport(mailgunOptions);
    emailClient = nodemailer.createTransport(transport);
    console.log('MailGun Server Used');

  } else {
    console.log('Internal Mail Server Used');
  }
});
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

try {
  new CronJob('00 00 6 1 1,4,7,10 *', function() {
    console.log('this should not be printed');
  })
} catch(ex) {
  console.log("cron pattern not valid");
}

let companiesList = [];
let eventsList = [];

const emailQuarterlyJob = new CronJob({
  // seconds, minutes, hours, days of month, months, days of week
  // cronTime: '00 00 20 * * 0-6'
  // cronTime: '*/60 * * * * 0-6',

  // Quarterly CronTime every Jan, April, Jul, Oct 1st at 5 AM on any day
  cronTime: '0 0 5 1 1,4,7,10 *',
  // cronTime: '* * */24 * * 0-6',
  // cronTime: '*/60 * * * * *',
  onTick: function () {
    console.log('emailJob tick at: ', new Date());


    Company.find({},
      function (err, companyDocuments) {
        if (err) {
          console.log('Could not query Company db!');
        }
        companiesList = companyDocuments;
      }).then(() => {
        // console.log('companies: ', companiesList);
      }
    );

    Event.find({},
      function (err, eventDocuments) {
        if (err) {
          console.log('Could not query Event db!');
        }
        eventsList = eventDocuments;
      }).then(() => {
        // console.log('events: ', eventsList);
      }
    );

    console.log('companies: ', companiesList);
    console.log('events: ', eventsList);

    let fullCompanyEmailsList = [];
    let fullCompanyEventsList = [];

    // console.log('AllFeedbackCompanies: ', companies);
    // console.log('AllFeedbackEvents: ', events);


    // const companies = companiesList;
    // let
      companiesList.forEach((company, index, array) => {
      let partialCompanyEmailsList = [];

      // console.log('forEach: ', company);

      let partialCompanyEventsList = eventsList.filter(event => event.companyName === company.companyName);

      if (company.salesPerson.status) {
        partialCompanyEmailsList.push(company.salesPerson.email);
      }
      if (company.qualityPerson.status) {
        partialCompanyEmailsList.push(company.qualityPerson.email);
      }
      if (company.logisticsPerson.status) {
        partialCompanyEmailsList.push(company.logisticsPerson.email);
      }
      if (company.differentPerson.status) {
        partialCompanyEmailsList.push(company.differentPerson.email);
      }
      fullCompanyEmailsList.push(partialCompanyEmailsList);
      // console.log('companyEmails: ', companyEmails);

      fullCompanyEventsList.push(partialCompanyEventsList);

      // setTimeout(() =>{}
      //   , 2500);



    });


    console.log('fullCompanyEmailsList: ', fullCompanyEmailsList);
    console.log('fullCompanyEventsList: ', fullCompanyEventsList);

    fullCompanyEmailsList.forEach((emailGroup, index, array) => {
      if (emailGroup.length == 0) {
        return;
      }
      console.log('index: ', index);

      readHTMLFile(path.join(__dirname, '../models/html_templates/companyReport.html'), function (err, html) {


        const emailReplacements = fullCompanyEventsList[index];
        const start = new Date();
        const end = new Date(new Date(start).setMonth(start.getMonth() - 12));

        let processedEmailReplacements = emailReplacements
          .filter(events => Date.parse(events.eventDate) <= start && Date.parse(events.eventDate) >= end)
          .filter(events => events.statusOption === 'Open' || events.statusOption === 'Pending');

        // console.log('emailReplacements: ', emailReplacements);
        handlebars.registerHelper('ifEventBad', function (a, b, options) {
          // console.log('event', a);
          if (a.statusOption === b) {
            return options.fn(this);
          }
        });
        handlebars.registerHelper('ifEventMid', function (a, b, options) {
          // console.log('event', a);
          if (a.statusOption === b) {
            return options.fn(this);
          }
        });

        handlebars.registerHelper('ifEventGood', function (a, b, options) {
          // console.log('event', a);
          if (a.statusOption === b) {
            return options.fn(this);
          }
        });

        handlebars.registerHelper('ifGreen', function (a, b, options) {
          console.log('startDate: ', start);
          console.log('endDate: ', end);

          // try {
          //   console.log('eventDate', Date.parse(emailReplacements[0].eventDate) <= start);
          //
          // } catch (e) {
          //   return;
          // }
          // let num = emailReplacements
          //   .filter(events => Date.parse(events.eventDate) <= start && Date.parse(events.eventDate) >= end)
          //   .filter(events => events.statusOption === 'Open' || events.statusOption === 'Pending');
          console.log('num: %s \n numLength: %s', processedEmailReplacements, processedEmailReplacements.length);

          if (processedEmailReplacements.length < 2) {
            console.log('GREEN');
            return '<font color="#66BB6A"><b>GREEN</b></font>.<br><br>\n' +
              'Thank you for your ongoing support.';
          } else if (processedEmailReplacements.length >= 2 || processedEmailReplacements.length <= 4) {
            console.log('YELLOW');
            return '<font color="#FFEE58"><b>YELLOW</b></font>.<br><br>\n' +
              'Please review all corrective actions on past issues and proactively look for common issues.\n';
          } else if (processedEmailReplacements.length > 4) {
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

        const htmlToSend = template({eventItems: processedEmailReplacements});

        const mailContents = {
          from: 'bill@tandlautomatics.com',
          bcc: ['gwfreak01@gmail.com', 'max@tandlautomatics.com'],
          text: 'Email Reports from T&L Automatics',
          html: htmlToSend
        };


        // emailList[1].forEach(function (email, i, array) {
        console.log('sending to: ', emailGroup);
        console.log('individualCompanyEvents:', processedEmailReplacements);

        // console.log('emailReplacements: ', emailReplacements);
        // console.log('emailList: ', emailList);
        mailContents.to = emailGroup;
        mailContents.subject = 'Quarterly Supplier Report';
        // console.log(mailContents);

        emailClient.sendMail(mailContents, function (err, info) {
          if (err) {
            console.log(err);

          } else {
            // console.log(i);
            console.log('Message sent: %s %s', info.messageId, emailGroup);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        });


        // });

      });
      if (index === fullCompanyEmailsList.length - 1) {
        // mailContents.transport.close();
        console.log('All Quarterly Emails sent');
      }
    });


  },
  // start: true,
  runOnInit: true,
  timezone: 'America/New_York'

});
emailQuarterlyJob.start();

// emailQuarterlyJob.timeout();




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


    const emailReplacements = req.body.events;

    // console.log('replacements: ', emailReplacements);
    handlebars.registerHelper('ifEventBad', function (a,b, options) {
      // console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });
    handlebars.registerHelper('ifEventMid', function (a,b, options) {
      // console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });

    handlebars.registerHelper('ifEventGood', function (a,b, options) {
      // console.log('event', a);
      if (a.statusOption === b) {
        return options.fn(this);
      }
    });

    handlebars.registerHelper('ifGreen', function (a,b, options) {
      const start = new Date();
      const end = new Date(new Date(start).setMonth(start.getMonth() - 12));
      console.log('startDate: ', start);
      console.log('endDate: ', end);

      console.log('eventDate', Date.parse(emailReplacements[0].eventDate) <= start);
      let num = emailReplacements
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

    const htmlToSend = template({eventItems: emailReplacements});

    const mailContents = {
      from: 'bill@tandlautomatics.com',
      bcc: 'gwfreak01@gmail.com',
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
      bcc: 'gwfreak01@gmail.com',
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

exports.sendAllFeedbackEmails = (req, res, next) => {
  // console.log(req.body);

  const companies = req.body.companies;
  const events = req.body.events;
  let fullCompanyEmailsList = [];
  let fullCompanyEventsList = [];

  // console.log('AllFeedbackCompanies: ', companies);
  // console.log('AllFeedbackEvents: ', events);


  companies.forEach((company, index, array) => {
    let partialCompanyEmailsList = [];

    // console.log('forEach: ', company);

    let partialCompanyEventsList = events.filter(event => event.companyName == company.companyName);

    if (company.salesPerson.status) {
      partialCompanyEmailsList.push(company.salesPerson.email);
    }
    if (company.qualityPerson.status) {
      partialCompanyEmailsList.push(company.qualityPerson.email);
    }
    if (company.logisticsPerson.status) {
      partialCompanyEmailsList.push(company.logisticsPerson.email);
    }
    if (company.differentPerson.status) {
      partialCompanyEmailsList.push(company.differentPerson.email);
    }
    fullCompanyEmailsList.push(partialCompanyEmailsList);
    // console.log('companyEmails: ', companyEmails);

    fullCompanyEventsList.push(partialCompanyEventsList);

    // setTimeout(() =>{}
    //   , 2500);



  });


  console.log('fullCompanyEmailsList: ', fullCompanyEmailsList);
  console.log('fullCompanyEventsList: ', fullCompanyEventsList);

  fullCompanyEmailsList.forEach((emailGroup, index, array) => {
    if (emailGroup.length == 0) {
      return;
    }
    console.log('index: ', index);

    readHTMLFile(path.join(__dirname, '../models/html_templates/companyReport.html'), function (err, html) {


      const emailReplacements = fullCompanyEventsList[index];
      const start = new Date();
      const end = new Date(new Date(start).setMonth(start.getMonth() - 12));

      let processedEmailReplacements = emailReplacements
        .filter(events => Date.parse(events.eventDate) <= start && Date.parse(events.eventDate) >= end)
        .filter(events => events.statusOption === 'Open' || events.statusOption === 'Pending');

      // console.log('emailReplacements: ', emailReplacements);
      handlebars.registerHelper('ifEventBad', function (a, b, options) {
        // console.log('event', a);
        if (a.statusOption === b) {
          return options.fn(this);
        }
      });
      handlebars.registerHelper('ifEventMid', function (a, b, options) {
        // console.log('event', a);
        if (a.statusOption === b) {
          return options.fn(this);
        }
      });

      handlebars.registerHelper('ifEventGood', function (a, b, options) {
        // console.log('event', a);
        if (a.statusOption === b) {
          return options.fn(this);
        }
      });

      handlebars.registerHelper('ifGreen', function (a, b, options) {
        console.log('startDate: ', start);
        console.log('endDate: ', end);

        // try {
        //   console.log('eventDate', Date.parse(emailReplacements[0].eventDate) <= start);
        //
        // } catch (e) {
        //   return;
        // }
        // let num = emailReplacements
        //   .filter(events => Date.parse(events.eventDate) <= start && Date.parse(events.eventDate) >= end)
        //   .filter(events => events.statusOption === 'Open' || events.statusOption === 'Pending');
        console.log('num: %s \n numLength: %s', processedEmailReplacements, processedEmailReplacements.length);

        if (processedEmailReplacements.length < 2) {
          console.log('GREEN');
          return '<font color="#66BB6A"><b>GREEN</b></font>.<br><br>\n' +
            'Thank you for your ongoing support.';
        } else if (processedEmailReplacements.length >= 2 || processedEmailReplacements.length <= 4) {
          console.log('YELLOW');
          return '<font color="#FFEE58"><b>YELLOW</b></font>.<br><br>\n' +
            'Please review all corrective actions on past issues and proactively look for common issues.\n';
        } else if (processedEmailReplacements.length > 4) {
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

      const htmlToSend = template({eventItems: processedEmailReplacements});

      const mailContents = {
        from: 'bill@tandlautomatics.com',
        bcc: ['gwfreak01@gmail.com', 'max@tandlautomatics.com'],
        text: 'Email Reports from T&L Automatics',
        html: htmlToSend
      };


      // emailList[1].forEach(function (email, i, array) {
      console.log('sending to: ', emailGroup);
      console.log('individualCompanyEvents:', processedEmailReplacements);

      // console.log('emailReplacements: ', emailReplacements);
      // console.log('emailList: ', emailList);
      mailContents.to = emailGroup;
      mailContents.subject = 'Quarterly Supplier Report';
      // console.log(mailContents);

      emailClient.sendMail(mailContents, function (err, info) {
        if (err) {
          console.log(err);

        } else {
          // console.log(i);
          console.log('Message sent: %s %s', info.messageId, emailGroup);
          // Preview only available when sending through an Ethereal account
          // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
      });

    });
    if (index === fullCompanyEmailsList.length - 1) {
      // mailContents.transport.close();
      return res.status(200).json({
        message: 'Emails sent successfully!',
        emailList: fullCompanyEmailsList,
        eventsList: fullCompanyEventsList
      });
    }
  });

};

exports.sendCompanyUpdate = (req, res, next) => {
  const emailList = req.body;
  readHTMLFile(path.join(__dirname, '../models/html_templates/updateCompanyInfo.html'), function (err, html) {
    const template = handlebars.compile(html);
    const htmlToSend = template();

    const mailContents = {
      from: 'bill@tandlautomatics.com',
      // bcc: 'gwfreak01@gmail.com',
      text: 'Company Profile Update Request from T&L Automatics',
      html: htmlToSend
    };

    emailList.forEach(function (email, i, array) {
      mailContents.to = email;
      mailContents.subject = 'Company Profile Update Request';
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
  // res.status(201).json({
  //   message: 'Requested Company Updates'
  // });
}
