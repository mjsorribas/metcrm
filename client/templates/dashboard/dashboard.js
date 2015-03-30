Template.dashboard.helpers({
   Accounts: function(){
       return Accounts;
   },
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