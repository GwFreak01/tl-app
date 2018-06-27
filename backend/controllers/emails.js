const nodemailer = require('nodemailer');


const EMAIL_USERNAME = 'j4p6qp5oazzzwvn5@ethereal.email';
const  EMAIL_PASSWORD = 'CvKn8bTg64FpxqtFPd';

exports.sendEmail = (req, res, next) => {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'gwfreak01@gmail.com, thp9884@rit.edu', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
  });

  // console.log('SendEmail: ', req.body);
  return res.status(200).json({
    message: 'Email Sent!'
  });
};
