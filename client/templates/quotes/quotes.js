Template.QuoteSelect.helpers({
    tableSettings: function() {
        return {
            collection: Accounts.find(),
            rowsPerPage: 10,
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    fn: function(value, object) {
                        return new Spacebars.SafeString('<a href="/quote/new/'+object._id+'" class="select">'+object.name+'</a>');
                    }
                },
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
                { key: 'invoiceId', label: 'Invoice #', fn: function(value, object) { return new Spacebars.SafeString('<a href="quote/edit/' + object._id + '">W' + object.quoteId + '</a>') }},
                { key: 'account', label: 'Account', fn: function(value, object) { return Accounts.findOne({_id: object.accountId}).name }},
                { key: 'shipping', label: 'Shipping', fn: function(value, object) { if(!object.shipping) { return 0} else { return object.shipping }}},
                { key: 'lineItems', label: 'Line Items', fn: function(value, object) {
                    lineItemCount = LineItems.find({quoteId: object._id}).count();

                    if (this.lineItemCount == 0) {
                        return 'EMPTY';
                    } else {
                        return this.lineItemCount;
                    }
                }}
            ]
        }
    }
});

Template.QuoteSelect.events({
   "click .reactive-table tr" : function(event) {

       if (event.target.className == 'select') {
           currentQuote = Quotes.insert({
               shipping: 0,
               invoiced: false,
               accountId: this._id
           });
           Router.go('/quote/edit/' + currentQuote);
       }
       event.preventDefault();
   }
});

Template.QuotesAll.events({
    "click #newQuote" : function() {
        Router.go('/quote/select');
    }
});

Template.QuotesEdit.helpers({
   lineItems : function() {
       return LineItems.find({quoteId: this.quote._id});
   },
    active : function() {
        return this._id == Template.instance().active.get();
    }
});

Template.QuotesEdit.created = function() {
    this.active = new ReactiveVar(0);
};

Template.QuotesEdit.events({
    "click .table-responsive tr" : function(event) {
        Template.instance().active.set(this._id);
    }
});