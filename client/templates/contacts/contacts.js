Template.contactsFormInsert.helpers({
    contacts: function() {
        return Contacts.find();
    }
});

Template.allContacts.helpers({
    tableSettings: function() {
        return {
            collection: Contacts.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object) { return new Spacebars.SafeString('<a href="/contact/'+object._id+'">'+object.firstName+' '+object.lastName+'</a>'); } },
                { key: 'phone', label: 'Phone #' },
            ]
        }
    }
});

AutoForm.hooks({
    insertContactForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/contact/' + result);
                }
            }
        }
    }
});