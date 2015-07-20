LineItems = new Mongo.Collection('lineItems', {
  transform: function (doc) {
    doc.lineTotal = doc.price * doc.qty - doc.discount;
    return doc;
  }
});

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
    autoform: {
      omit: true
    }
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  lineTotal: {
    type: String,
    label: "Total",
    optional: true,
    autoform: {
      omit: true
    }
  }
}));

