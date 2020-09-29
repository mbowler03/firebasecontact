const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const path = require('path')
const port = 3001
const app = express();
const cors = require("cors");

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('contact',{layout:false});
});
app.post('/send', (req, res) => {
  console.log(req.body);  
  const output = `
    <p>${req.body.name},<p>
      <p>It was nice meeting you. My collegues a I look forward to speaking with you in the future and finding ways to collaborate. I have included my contact information below.</P>
      <p>Thank you,</p>
      <h3>Matthew Bowler</h3>
      <h3>SpinSpire</h3>
      <h3>info@spinspire.com</h3>
      <h3>(904)638-2918</h3>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'abigail25@ethereal.email', // generated ethereal user
          pass: 'R7YC47fJTjzgeFwhd5'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <abigail25@ethereal.email>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Contact Request', // Subject line
        //text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });

app.listen(3001, () => console.log(`Server active on ${port}`))