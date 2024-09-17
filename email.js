const nodemailer = require('nodemailer');
const path = require('path');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gangwaniakanksha@gmail.com', 
    pass: '9179381604' 
  }
});

const mailOptions = {
  from: 'gangwaniakanksha@gmail.com', 
  to: 'hr@ignitershub.com',
  subject: 'Challenge 3 Completed',
  text: `
    Name: AKANKSHA GANGWANI
    Semester: VI
    Branch: CSE
    Roll Number: 21070521006
  `,
  attachments: [
    {
      filename: 'NETF1.png',
      path: path.join(__dirname, '/Users/tinagangwani/py/NETF1.png'), 
      cid: 'unique@image.cid'  
    }
  ]
};

// Send email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error occurred: ', error);
  } else {
    console.log('Email sent successfully: ' + info.response);
  }
});
