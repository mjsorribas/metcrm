Quotes = new Mongo.Collection('quotes');
QuoteSeq = new Mongo.Collection('quoteSeq');
Quotes.attachSchema(new SimpleSchema({
    accountId: {
        type: String,
        label: "Account",
        max: 200,
        autoform: {
            omit: true
        }
    },
    shipping: {
        type: String,
        label: "Shipping",
        max: 200
    },
    invoiced: {
        type: Boolean,
        label: "invoiced",
        autoform: {
            omit: true
        }
    },
    total: {
        type: String,
        label: 'Total'
    },
    subtotal: {
        type: String,
        label: "Sub-Total"
    }

}));

if (Meteor.isServer) {
    Quotes.before.insert(function(userId, doc) {
        doc.quoteId = incrementCounter(QuoteSeq, 'quoteSeq');
    });
}


