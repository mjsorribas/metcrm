CustomerTypes = new Mongo.Collection('customerTypes');

CustomerTypes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Label",
    max: 200
  }
}));