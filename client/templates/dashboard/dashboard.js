Template.dashboard.helpers({
   Contacts: function(){
       return Contacts;
   },
    tableSettings: function() {
        return {
            collection: Contacts.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object) { return new Spacebars.SafeString('<a href="/contact/'+object._id+'">'+object.firstName+ ' ' +object.lastName+ '</a>'); } },
                { key: 'phone', label: 'Phone #' },
                { key: 'email', label: 'Email' },
                { key: 'account', label: 'Account', fn: function(value, object) { return new Spacebars.SafeString('<a href="/account/' + object.account + '">' +Accounts.findOne({_id:object.account}).name+ '</a>')}}
            ]
        }
    }
});