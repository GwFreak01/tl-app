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
  this.emailClient = nodemailer.createTransport(transport);
  const mailContents = {
    from: 'office@yourdomain.com',
    to: 'gwfreak01@gmail.com',
    subject: 'test subject',
    text : 'test message form mailgun',
    html : '<b>test message form mailgun</b>'
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
      return res.status(200).json({
        message: 'Email sent successfully!'
      });
    }

  });
};
