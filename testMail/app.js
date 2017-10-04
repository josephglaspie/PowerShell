//NOT WORKING
var sendgrid = require("sendgrid")("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");
var email = new sendgrid.Email();

email.addTo("josephglaspie@gmail.com");
email.setFrom("you@youremail.com");
email.setSubject("Sending with SendGrid is Fun");
email.setHtml("and easy to do anywhere, even with Node.js");

sendgrid.send(email);