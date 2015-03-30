Meteor.publish("accounts", function(){
    return Accounts.find();
});
Meteor.publish("contacts", function(){
    return Contacts.find();
});