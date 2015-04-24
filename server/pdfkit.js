Meteor.startup(function () {
  pdfAsync = function (html, cb) {
    console.log('in async');
    var pdf = Meteor.npmRequire('html-pdf');

    pdf.create(html).toBuffer(Meteor.bindEnvironment(function (err, buffer) {
      cb && cb(null, buffer);
      return;
    }));
  }
});

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

function emailClient(buffer, emailTo, type) {
  var emailFrom = Settings.findOne({name: 'emailFrom'}).value;
  var quoteEmailBody = Settings.findOne({name: 'quoteEmailBody'}).value;

  var mailer = Meteor.npmRequire('nodemailer');

  var transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'joshgdovin@gmail.com',
      pass: 'qweQWE123!@#'
    }
  });

  var mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: 'Your ' + type + ' is ready',
    text: quoteEmailBody,
    attachments: [
      {
        filename: 'attachment.pdf',
        content: buffer
      }
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent:' + info.response);
    }
  });
}


Meteor.methods({
  createPDF: function (html) {
    var pdfSync = Meteor.wrapAsync(pdfAsync);
    try {
      var result = pdfSync(html);
      var resultId = PdfsCollection.insert({pdf: result});
      return resultId;
      //return result;
    } catch (e) {
      console.log(e);
    }
  },
  emailPDF: function (html, email, type) {
    var pdf = Meteor.npmRequire('html-pdf');

    pdf.create(html).toBuffer(Meteor.bindEnvironment(function (err, buffer) {
      emailClient(buffer, email, type);
    }));
  }
});