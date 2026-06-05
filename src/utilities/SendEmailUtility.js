/* -------------------------------------------------------------------------- */
/*                                Nodemailer Setup                            */
/* -------------------------------------------------------------------------- */

const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: EmailTo,
    from: `Inventory Management System <${process.env.EMAIL_USER}>`,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;