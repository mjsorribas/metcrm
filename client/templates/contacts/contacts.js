Template.contactsFormInsert.helpers({
  contacts: function () {
    return Contacts.find();
  }
});

Template.ContactsView.rendered = function() {
  $('.editable').editable({
    mode: 'inline',
    success: function (response, newValue) {
      var fieldName = $(this).data('name');
      var set = {};
      set[$(this).data('name')] = newValue;
      if(!Contacts.simpleSchema().namedContext().validateOne(set, $(this).data('name'))) {
        return "Invalid";
      }

      Contacts.update($(this).data('pk'),
        {$set: set});
    },
    display: function(value, response) {
      return false;
    }

  });
}

Template.allContacts.helpers({
  tableSettings: function () {
    return {
      collection: Contacts.find(),
      rowsPerPage: 10,
      fields: [
        {
          key: 'name', label: 'Name', fn: function (value, object) {
          return new Spacebars.SafeString('<a href="/contact/' + object._id + '">' + object.firstName + ' ' + object.lastName + '</a>');
        }
        },
        {key: 'phone', label: 'Phone #1'},
        {key: 'phone2', label: 'Phone #2'},
        {key: 'phone', label: 'Phone #'},
        {key: 'phone', label: 'Phone #'},
        {key: 'phone', label: 'Phone #'},
        {
          key: 'account', label: 'Account', fn: function (value, object) {
          return new Spacebars.SafeString('<a href="/account/' + object.account + '">' + AccountsCollection.findOne({_id: object.account}).name + '</a>')
        }
        },
      ]
    }
  }
});

Template.allContacts.events({
  "click #newContact": function () {
    Router.go('/contact/new');
  }
});

AutoForm.hooks({
  insertContactForm: {
    after: {
      insert: function (error, result) {
        if (!error) {
          Router.go('/contact/' + result);
        }
      }
    }
  }
});