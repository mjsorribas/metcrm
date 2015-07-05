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
  billingStreet: {
    type: String,
    label: "Billing Street",
    optional: true
  },
  billingCity: {
    type: String,
    label: "Billing City",
    optional: true
  },
  billingState: {
    type: String,
    label: "Billing State",
    optional: true
  },
  billingCode: {
    type: String,
    label: "Billing Code",
    optional: true
  },
  billingCountry: {
    type: String,
    label: "Billing Country",
    optional: true
  },
  shippingStreet: {
    type: String,
    label: "Shipping Street",
    optional: true
  },
  shippingCity: {
    type: String,
    label: "Shipping City",
    optional: true
  },
  shippingState: {
    type: String,
    label: "Shipping State",
    optional: true
  },
  shippingCode: {
    type: String,
    label: "Shipping Code",
    optional: true
  },
  shippingCountry: {
    type: String,
    label: "Shipping Country",
    optional: true
  },
  email: {
    type: String,
    optional: true,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email
  },
  accountTypeId: {
    type: String,
    autoform: {
      type: "select2",
      options: function () {
        return _.map(CustomerTypes.find().fetch(), function (service) {
          return {
            label: service.name,
            value: service._id
          };
        });
      },
      selectOnBlur: true
    }
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
