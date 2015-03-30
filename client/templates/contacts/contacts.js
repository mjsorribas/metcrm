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
                { key: 'phone', label: 'Phone #1' },
                { key: 'phone2', label: 'Phone #2' },
                { key: 'phone', label: 'Phone #' },
                { key: 'phone', label: 'Phone #' },
                { key: 'phone', label: 'Phone #' },
                { key: 'account', label: 'Account', fn: function(value, object) { return new Spacebars.SafeString('<a href="/account/'+object.account+'">' + Accounts.findOne({_id: object.account}).name + '</a>')} },
            ]
        }
    }
});

Template.allContacts.events({
    "click #newContact" : function() {
        Router.go('/contact/new');
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