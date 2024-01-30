const nodemailer= require('nodemailer');
exports.generateOTP=()=>{
    let otp= ''
  for(let i=0;i<=3;i++)
  {
    const rand= Math.round(Math.random()*9)
    otp= otp+rand
  }
  return otp;
}
/*exports.mailTransport=()=> nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e2600ac078e329",
          pass: "4718eacfa8ddc7"
        }
      });*/
     /* exports.sendMail = ()=>nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },

      });*///import { createTransport } from "nodemailer";

exports.sendMail = async (email, subject, text) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
  });
};

        
         
        
     
     
