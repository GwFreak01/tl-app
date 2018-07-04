const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
};

const emailCompanyRegistration = "To our Valued Suppliers,\n" +
  "    <br><br>\n" +
  "\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We have developed a web-based tool that has been designed to help us collect supplier\n" +
  "    profile data and also automate performance feedback to our suppliers on a quarterly basis. This system will require\n" +
  "    that you designate a point person to submit the information requested and also be the recipient of the quality and\n" +
  "    delivery performance feedback that we will send to your designated staff each quarter via email.<br><br>\n" +
  "\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We ask that you take approximately 5 minutes to fill out the profile survey and\n" +
  "    submit it to us within the next week. Follow the instructions below to access the T&L Supplier site and submit\n" +
  "    the profile for your company. Thank you in advance for your support.<br><br>\n" +
  "\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Go to <a href=\"http://tl-app.s3-website.us-east-2.amazonaws.com/login\">T&L Supplier Management System Portal</a><br>\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Click NEW COMPANY<br>\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Fill out the profile survey<br>\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Click the Submit Button<br><br>\n" +
  "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Once you have registered, you will be logged out automatically and your company will\n" +
  "    be able to receive quarterly performance\n" +
  "    feedback.<br><br>\n" +
  "    Sincerely,<br>\n" +
  "    <b>William J. Green</b><br>\n" +
  "    Vice President - Sales and Marketing<br>\n" +
  "    <img src=\"http://i.imgur.com/p4NrWee.png\" alt=\"Logo\" height=\"95\" width=\"144\"><br>\n" +
  "\n" +
  "    <p><i><b>Improving….Never done!!</b></i></p><br>\n" +
  "    770 Emerson Street<br>\n" +
  "    Rochester, NY 14613<br>\n" +
  "    Office 585 647-3717<br>\n" +
  "    Fax 585 647-1126<br>\n" +
  "    <a href=\"www.tandlautomatics.com\">www.tandlautomatics.com</a><br>\n";


const transport = mailgunTransport(mailgunOptions);

let localTransport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
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

exports.sendCompanyRegistration = (req, res, next) => {
  console.log(req.body.email);

  const emailClient = nodemailer.createTransport(transport);

  const mailContents = {
    from: 'office@yourdomain.com',
    to: req.body.email,
    text: 'test message form mailgun',
    subject: 'New Company Registration - T&L Supplier Management System',
    html: emailCompanyRegistration
  };

  emailClient.sendMail(mailContents, function (err, info) {
    if (err) {
      return res.status(404).json({
        message: 'Emails sent failed!'
      });
    } else {
      console.log('Message sent: %s %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    }
     // mailContents.transport.close();
      return res.status(200).json({
        message: 'Emails sent successfully!'
      });

  });


};
