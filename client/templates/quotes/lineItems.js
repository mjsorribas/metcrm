Template.QuotesEdit.helpers({
    //quote : function() {
    //    return Quotes.findOne({_id: this.quoteId});
    //},
    account: function() {
        return Accounts.findOne({_id: this.quote.accountId});
    }
});