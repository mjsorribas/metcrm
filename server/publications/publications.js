Meteor.publish("accounts", function () {
  return AccountsCollection.find();
});

Meteor.publish("contacts", function () {
  return Contacts.find();
});

Meteor.publish("manufacturers", function () {
  return Manufacturers.find();
});

Meteor.publish("products", function () {
  return Products.find();
});

Meteor.publish("quotes", function (limiter) {
  if (limiter) {
    limiter.deleted = null;
    return Quotes.find(limiter);
  } else {
    return Quotes.find({deleted: null});
  }

});

Meteor.publish("pdfs", function () {
  return PdfsCollection.find();
});

Meteor.publish("settings", function () {
  return Settings.find();
});

Meteor.publish("lineItems", function () {
  return LineItems.find();
});

Meteor.publish("packageTypes", function () {
  return PackageTypes.find();
});

Meteor.publish("customerTypes", function() {
  return CustomerTypes.find();
});

Meteor.publish("comments", function(limiter) {
  return Comments.find(limiter, {sort: {createdAt: -1}});
});

Meteor.publish("userData", function(limiter) {
  return Meteor.users.findOne({_id: limiter});
});

