//NOT WORKING
var sendgrid = require("sendgrid")("APIKey");
var email = new sendgrid.Email();

email.addTo("josephglaspie@gmail.com");
email.setFrom("you@youremail.com");
email.setSubject("Sending with SendGrid is Fun");
email.setHtml("and easy to do anywhere, even with Node.js");

sendgrid.send(email);
