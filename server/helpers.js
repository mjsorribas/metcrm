Meteor.methods({
  updateQuote: function (quoteId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var lineItems = LineItems.find({quoteId: quoteId}).fetch();
    var subtotal = 0;

    for (var i = 0; i < lineItems.length; i++) {
      subtotal += lineItems[i].lineTotal;
    }

    var quote = Quotes.findOne({_id: quoteId});
    var updates = {subtotal: subtotal, total: subtotal + parseInt(quote.shipping)};
    Quotes.update(quoteId, {$set: updates});
  }
});