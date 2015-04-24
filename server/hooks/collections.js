var reference = function (userId, doc) {
  Meteor.call('updateQuote', doc.quoteId);
};
LineItems.after.update(reference);

LineItems.after.insert(reference);

LineItems.after.remove(reference);
