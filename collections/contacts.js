Contacts = new Mongo.Collection('contacts');
console.log(Contacts.find().fetch());
var accounts = Accounts.find();

Contacts.attachSchema(new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 200
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 200
    },
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional: true
    },
    phone: {
        type: String,
        label: "Phone #1",
        optional: true,
        regEx: SimpleSchema.RegEx.Phone
    },
    phone2: {
        type: String,
        label: "Phone #2",
        optional: true,
        regEx: SimpleSchema.RegEx.Phone
    },
    fax: {
        type: String,
        label: "Fax",
        optional: true,
        regEx: SimpleSchema.RegEx.Phone
    },
    email: {
        type: String,
        optional: true,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email
    },
    account: {
        type: String,
        autoform: {
            type: "select2",
            options: function() {
                return _.map(Accounts.find().fetch(), function(service) {
                    return {
                        label: service.name,
                        value: service._id
                    };
                    });
            },
            selectOnBlur: true


        }
    }
}));

AdminConfig = {
    collections: {
        Accounts: {},
        Contacts: {}
    }
};

Contacts.helpers({
    getOwner : function() {
        return Meteor.users.findOne({_id: this.owner});
    },
    accountName : function() {
        return Accounts.findOne({_id : this.account}).name;
    },
    fullName: function() {
        return this.firstName;
    }
});
