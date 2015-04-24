Manufacturers = new Mongo.Collection('manufacturers');

Manufacturers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  }
}));


Manufacturers.helpers({});
