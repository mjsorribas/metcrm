AccountsCollection = new Mongo.Collection('accounts');

AccountsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
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
    regEx: SimpleSchema.RegEx.Phone,
    optional: true
  },
  fax: {
    type: String,
    label: "Fax",
    regEx: SimpleSchema.RegEx.Phone,
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
  },
  accountTypeId: {
    type: String
  },
  owner: {
    type: String,
    autoform: {
      omit: true
    }
  }
});

AccountsCollection.attachSchema(AccountsSchema);

AccountsCollection.helpers({
  getOwner: function () {
    return Meteor.users.findOne({_id: this.owner});
  },
  label: function () {
    return this.name;
  },
  value: function () {
    return this._id;
  }
});
