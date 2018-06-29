const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
};

const transport = mailgunTransport(mailgunOptions);

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
   const emailClient = nodemailer.createTransport(transport);

  console.log('emailList: ', emailList);
  console.log('affectedEvents: ', req.body.events);

  const mailContents = {
    from: 'office@yourdomain.com',
    text: 'test message form mailgun',
    html: '<b>test message form mailgun</b>' + req.body.events
  };

  emailList.forEach(function (email, i, array) {
    mailContents.to = email;
    mailContents.subject = 'test subject: ' + i;
    console.log(mailContents);

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
};
