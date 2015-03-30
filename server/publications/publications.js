Meteor.publish("accounts", function(){
    return Accounts.find();
});

Meteor.publish("contacts", function(){
    return Contacts.find();
});

Meteor.publish("manufacturers", function() {
    return Manufacturers.find();
});

Meteor.publish("products", function() {
    return Products.find();
});

Meteor.publish("quotes", function() {
    return Quotes.find();
});

