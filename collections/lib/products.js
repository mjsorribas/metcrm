Products = new Mongo.Collection('products');

Products.attachSchema(new SimpleSchema({
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
  extendedPrice: {
    type: String,
    label: "Extended Price",
    max: 200
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
  bin: {
    type: String,
    label: "Bin",
    max: 200
  },
  manufacturer: {
    type: String,
    autoform: {
      type: "select2",
      options: function () {
        return _.map(Manufacturers.find().fetch(), function (service) {
          return {
            label: service.name,
            value: service._id
          };
        });
      },
      selectOnBlur: true


    }
  }
}));


Products.helpers({});
