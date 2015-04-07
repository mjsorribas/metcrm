var quotesHelpers = {
    lineItems : function() {
        return LineItems.find({quoteId: this.quote._id});
    },
    active : function() {
        return this._id == Template.instance().active.get();
    },
    invoiced: function() {
        if(this.quote.invoiced == true) {
            return true;
        }
        return false;
    },
    quotesPage: function() {
        return this.docType == 'Quote';
    },
    quoteInvoiced: function() {
        if(this.quote.invoiced == true && this.docType == 'Quote') {
            return true;
        }
        return false;
    },
    account: function() {
        return Accounts.findOne({_id: this.quote.accountId});
    }
};
Handlebars.registerHelper('formatCurrency', function(item) {
       return numeral(item).format(currencyFormat);
});

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
                { key: 'quoteId', label: 'Quote #', fn: function(value, object) { return new Spacebars.SafeString('<a href="quote/edit/' + object._id + '">W' + object.quoteId + '</a>') }},
                { key: 'account', label: 'Account', fn: function(value, object) { return Accounts.findOne({_id: object.accountId}).name }},
                { key: 'subtotal', label: 'Subtotal', fn: function(value, object) { if(!object.subtotal) { return 0} else { return numeral(object.subtotal).format(currencyFormat); }}},
                { key: 'discount', label: 'Discount', fn: function(value, object) {
                    var lineItems = LineItems.find({quoteId: object._id}).fetch();
                    var discount = 0;
                    $.each(lineItems, function(key, value) {
                        discount += parseInt(value.discount);
                    });
                    return numeral(discount).format(currencyFormat);
                }},
                { key: 'shipping', label: 'Shipping', fn: function(value, object) { if(!object.shipping) { return 0} else { return numeral(object.shipping).format(currencyFormat); }}},
                { key: 'total', label: 'Total', fn: function(value, object) { if(!object.total) { return 0} else { return numeral(object.total).format(currencyFormat); }}},
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
               accountId: this._id,
               total: 0,
               subtotal: 0
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

Template.QuotesEdit.helpers(quotesHelpers);
Template.QuotePrint.helpers(quotesHelpers);
Template.QuotesEdit.created = function() {
    this.active = new ReactiveVar(0);
};

Template.QuotesEdit.events({
    "click .table-responsive tr" : function(event, template) {
        if(event.target.className == 'delete' || event.target.parentNode.className == 'delete') {
            if(confirm) {
                LineItems.remove({_id: this._id});
            }
            return;
        }
        Template.instance().active.set(this._id);
    },
    "blur #shipping" : function(event, template) {

        //strip out commas and $ from the shipping so we store the shipping as a float
        var shipping =  template.$(event.target).val().replace(/[$,]/g,"");
        Quotes.update(template.data.quote._id, {$set : {shipping : shipping}});
        Meteor.call('updateQuote', template.data.quote._id);
    },
    "click #invoice" : function(event, template) {
        Quotes.update(template.data.quote._id, {$set: {invoiced: true}});
    },
    "click #viewInvoice" : function(event, template) {
        Router.go('/invoice/edit/' + template.data.quote._id);
    },
    "click #pdf" : function(event, template) {

        Blaze.saveAsPDF(Template.QuotePrint, {
            filename: "quote.pdf", // optional, default is "document.pdf"
            data: template.data, // optional, render the template with this data context
            x: 0, // optional, left starting position on resulting PDF, default is 4 units
            y: 0, // optional, top starting position on resulting PDF, default is 4 units
            orientation: "portrait", // optional, "landscape" or "portrait" (default)
            unit: "in", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
            format: "letter" // optional, see Page Formats, default is "a4"
        });
    }
});