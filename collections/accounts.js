Accounts = new Mongo.Collection('accounts');

Accounts.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    phone: {
        type: Number,
        label: "Phone #",
        optional: true
    },
    phone2: {
        type: Number,
        label: "Phone #",
        optional: true
    },
    fax: {
        type: Number,
        label: "Fax",
        optional: true
    },
    billingAddress: {
        type: String,
        label: "Billing Address",
        optional: true
    },
    shippingAddress: {
        type: String,
        label: "Shipping Address",
        optional: true
    },
    email: {
        type: String,
        optional: true,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email
    }
}));

Accounts.helpers({
   getOwner : function() {
       return Meteor.users.findOne({_id: this.owner});
   }
});

Meteor.methods({
   addAccount: function (account) {
        Accounts.create(account);
   }
});
