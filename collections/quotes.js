Quotes = new Mongo.Collection('quotes');

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
    }

}));



Quotes.helpers({

});
