PackageTypes = new Mongo.Collection('packageTypes');

PackageTypes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  }
}));


PackageTypes.helpers({});
