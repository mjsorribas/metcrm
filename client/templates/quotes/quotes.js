Template.quoteSelect.helpers({
    tableSettings: function() {
        return {
            collection: Accounts.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object) { return new Spacebars.SafeString('<a href="/quote/new/'+object._id+'">'+object.name+'</a>'); } },
                { key: 'phone', label: 'Phone #' },
            ]
        }
    }
});

Template.QuotesAll.helpers({
    tableSettings: function() {
        return {
            collection: Quotes.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'invoiceId', label: 'Invoice #', fn: function() { return 'W' + this.invoiceId }},
                { key: 'account', label: 'Account', fn: function() { return Accounts.findOne({_id: this.account}).name }},
                { key: 'shipping', label: 'Shipping', fn: function() { if(!this.shipping) { return 0} else { return this.shipping }}}
            ]
        }
    }
});