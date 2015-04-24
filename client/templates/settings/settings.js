Template.emailSettings.helpers({
  emailFrom: function () {
    return Settings.findOne({name: 'emailFrom'});
  },
  emailHtmlBody: function () {
    return Settings.findOne({name: 'quoteEmailHtmlBody'});
  },
  emailTextBody: function () {
    return Settings.findOne({name: 'quoteEmailBody'});
  }
});

Template.emailSettings.events({
  "click #save": function (event, template) {
    var emailFrom = template.$('#emailFrom');
    var emailHtmlBody = template.$('#emailHtmlBody');
    var emailTextBody = template.$('#emailTextBody');

    Settings.update(emailFrom.data('id'), {
      $set: {
        value: emailFrom.val()
      }
    });
    Settings.update(emailHtmlBody.data('id'), {
      $set: {
        value: emailHtmlBody.val()
      }
    });
    Settings.update(emailTextBody.data('id'), {
      $set: {
        value: emailTextBody.val()
      }
    });

  }
});