Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin'
    });
  }
  if (CustomerTypes.find().count() === 0) {
    CustomerTypes.insert({name: 'Customer'});
    CustomerTypes.insert({name: 'Vendor'});
    CustomerTypes.insert({name: 'Prospect'});
  }

  if (Settings.find().count() == 0) {
    Settings.insert({name: 'quoteEmailBody', value: 'Attached is your [type]'});
    Settings.insert({name: 'emailFrom', value: 'no-reply@no-reply.com'});
  }
});