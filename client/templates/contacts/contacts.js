Template.contactsFormInsert.helpers({
    contacts: function() {
        return Contacts.find();
    }
});


AutoForm.hooks({
    insertContactForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/contacts/' + result);
                }
            }
        }
    }
});