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
  this.emailClient = nodemailer.createTransport(transport);

  console.log('emailList: ', emailList);
  console.log('affectedEvents: ', req.body.events);

  for (i = 0; i < emailList.length; i++) {
    const mailContents = {
      from: 'office@yourdomain.com',
      to: emailList[i],
      subject: 'test subject',
      text: 'test message form mailgun',
      html: '<b>test message form mailgun</b>' + req.body.events
    };
    this.emailClient.sendMail(mailContents, function (err, info) {
      if (err) {
        return res.status(404).json({
          message: 'Email unable to send!'
        });
      } else {
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      }
    }).then(() => {
      return res.status(200).json({
        message: 'Email sent successfully!'
      });
      }
    );
  }



};
