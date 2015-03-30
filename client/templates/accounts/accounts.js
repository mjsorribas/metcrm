Template.accountsFormInsert.helpers({
   accounts: function() {
       return Accounts.find();
   }
});

Template.allAccounts.helpers({
    tableSettings: function() {
        return {
            collection: Accounts.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object) { return new Spacebars.SafeString('<a href="/account/'+object._id+'">'+object.name+'</a>'); } },
                { key: 'phone', label: 'Phone #' },
            ]
        }
    }
});

Template.allAccounts.events({
    "click #newAccount" : function() {
        Router.go('/account/new');
    }
});

Template.AccountsView.events({
    "click #createQuote" : function() {
         Router.go('/quote/new/' + this.account._id);
    }
});

Template.AccountsView.helpers({
    Contacts: function() {
        return Contacts;
    },
    tableSettings: function() {
        return {
            collection: Contacts.find({account: this.account._id}),
            rowsPerPage: 10,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object) { return new Spacebars.SafeString('<a href="/contact/'+object._id+'">'+object.firstName+' '+object.lastName+'</a>'); } },
                { key: 'phone', label: 'Phone #' },
            ]
        }
    }
});

AutoForm.hooks({
    insertAccountForm: {
        before: {
          insert: function(doc) {
              doc.owner = Meteor.userId();
              this.result(doc);
          }
        },
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/account/' + result);
                }
            }
        }
    }
});