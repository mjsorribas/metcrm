Template.accountsFormInsert.helpers({
   accounts: function() {
       return Accounts.find();
   }
});

AutoForm.hooks({
    insertAccountForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/accounts/' + result);
                }
            }
        }
    }
});