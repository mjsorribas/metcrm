Template.newLineItem.helpers({
    settings: function() {
        return {
            position: "bottom",
            limit: 5,
            rules: [
                {
                    token: '',
                    collection: Products,
                    field: "itemNumber",
                    template: Template.itemNumber
                }
            ]
        };
    }
});

Template.newLineItem.events({
   "autocompleteselect input": function(event, template, doc) {
       lineItemObj = {
           itemNumber: doc.itemNumber,
           productId: doc._id, qty: 1,
           price: doc.price,
           dateCode: doc.dateCode,
           discount: 0,
           lineTotal: doc.price,
           quoteId: template.data.quote._id
       };
       lineItem = LineItems.insert(lineItemObj);
   }
});

Template.editLineItem.helpers({
    lineItemTotal: function() {
        return this.price * this.qty - this.discount;
    }
});

Template.editLineItem.events({
   "blur input" : function(event,template) {
       var set = {};
       set[template.$(event.target).data('id')] = template.$(event.target).val();
       LineItems.update(template.data._id, {$set: set} );
   }
});