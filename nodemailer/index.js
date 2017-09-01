//set SENDGRID_API_KEY=''
//SENDGRID_API_KEY='https://app.sendgrid.com/guide/integrate/langs/smtp'
//
var SENDGRID_API_KEY = ''
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
    to: 'STEFAN_M_VON_ELLENRIEDER@homedepot.com',
    from: 'YourFavoriteSysEngineer@bff.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'Most excellent Stefan V, thanks for the tip on this super cool tool',
    html: 'Most excellent Stefan V, thanks for the tip on this super cool tool',
};
sgMail.send(msg);