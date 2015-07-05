Contacts = new Mongo.Collection('contacts');


ContactsSchema = new SimpleSchema({
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
  mailingStreet: {
    type: String,
    label: "Mailing Street",
    optional: true
  },
  mailingCity: {
    type: String,
    label: "Mailing City",
    optional: true
  },
  mailingState: {
    type: String,
    label: "Mailing State",
    optional: true
  },
  mailingZip: {
    type: String,
    label: "Mailing Zip",
    optional: true
  },
  mailingCountry: {
    type: String,
    label: "Mailing Country",
    optional: true
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
      options: function () {
        return _.map(AccountsCollection.find().fetch(), function (service) {
          return {
            label: service.name,
            value: service._id
          };
        });
      },
      selectOnBlur: true


    }
  }
});

Contacts.attachSchema(ContactsSchema);

AdminConfig = {
  collections: {
    Accounts: {},
    Contacts: {}
  }
};

Contacts.helpers({
  getOwner: function () {
    return Meteor.users.findOne({_id: this.owner});
  },
  accountName: function () {
    return AccountsCollection.findOne({_id: this.account}).name;
  },
  fullName: function () {
    return this.firstName;
  }
});
