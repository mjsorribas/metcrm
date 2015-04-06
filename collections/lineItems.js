LineItems = new Mongo.Collection('lineItems');

LineItems.attachSchema(new SimpleSchema({
    itemNumber: {
        type: String,
        label: "Item #",
        max: 200
    },
    price: {
        type: String,
        label: "Price",
        max: 200
    },
    discount: {
        type: String,
        label: "Discount",
        max: 200
    },
    productId: {
        type: String,
        label: "Product Id"
    },
    qty: {
        type: String,
        label: "Qty",
        max: 200
    },
    dateCode: {
        type: String,
        label: "Date Code",
        max: 200
    },
    quoteId: {
        type: String,
        label: "Quote Id",
        optional: true
    },
    invoiceId: {
        type: String,
        label: "Invoice Id",
        optional: true
    },
    lineTotal: {
        type: String,
        label: "Total"
    }
}));



LineItems.helpers({

});
