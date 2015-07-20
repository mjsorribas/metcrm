var quotesHelpers = {
  lineItems: function () {
    return LineItems.find({quoteId: this.quote._id});
  },
  active: function () {
    return this._id == Template.instance().active.get();
  },
  invoiced: function () {
    if (this.quote.invoiced == true) {
      return true;
    }
    return false;
  },
  quotesPage: function () {
    return this.docType == 'Quote';
  },
  quoteInvoiced: function () {
    if (this.quote.invoiced == true && this.docType == 'Quote') {
      return true;
    }

    return false;
  },
  account: function () {
    return AccountsCollection.findOne({_id: this.quote.accountId});
  },
  getUrl: function () {
    return Meteor.absoluteUrl();
  },
  hasEmail: function () {
    console.log(account);
  }
};
Handlebars.registerHelper('formatCurrency', function (item) {
  return numeral(item).format(currencyFormat);
});

Template.QuoteSelect.helpers({
  tableSettings: function () {
    return {
      collection: AccountsCollection.find(),
      rowsPerPage: 10,
      fields: [
        {
          key: 'name',
          label: 'Name',
          fn: function (value, object) {
            return new Spacebars.SafeString('<a href="/quote/new/' + object._id + '" class="select">' + object.name + '</a>');
          }
        },
        {key: 'phone', label: 'Phone #'},
      ]
    }
  }
});


Template.QuotesAll.helpers({
  tableSettings: function () {
    return {
      collection: Quotes.find(),
      rowsPerPage: 10,
      fields: [
        {
          key: 'quoteId', label: 'Delete', fn: function(value, object) {
          return new Spacebars.SafeString('<i class="fa fa-2x fa-minus-square-o text-danger"></i>');
        },
          cellClass: function(value, object) {
            return 'delete';
          }
        },
        {
          key: 'quoteId', label: 'Quote #', fn: function (value, object) {
          return new Spacebars.SafeString('<a href="quote/edit/' + object._id + '">W' + object.quoteId + '</a>')
        }
        },
        {
          key: 'account', label: 'Account', fn: function (value, object) {
          return AccountsCollection.findOne({_id: object.accountId}).name
        }
        },
        {
          key: 'subtotal', label: 'Subtotal', fn: function (value, object) {
          if (!object.subtotal) {
            return 0
          } else {
            return numeral(object.subtotal).format(currencyFormat);
          }
        }
        },
        {
          key: 'discount', label: 'Discount', fn: function (value, object) {
          var lineItems = LineItems.find({quoteId: object._id}).fetch();
          var discount = 0;
          $.each(lineItems, function (key, value) {
            discount += parseInt(value.discount);
          });
          return numeral(discount).format(currencyFormat);
        }
        },
        {
          key: 'shipping', label: 'Shipping', fn: function (value, object) {
          if (!object.shipping) {
            return 0
          } else {
            return numeral(object.shipping).format(currencyFormat);
          }
        }
        },
        {
          key: 'total', label: 'Total', fn: function (value, object) {
          if (!object.total) {
            return 0
          } else {
            return numeral(object.total).format(currencyFormat);
          }
        }
        },
        {
          key: 'lineItems', label: 'Line Items', fn: function (value, object) {
          lineItemCount = LineItems.find({quoteId: object._id}).count();

          if (this.lineItemCount == 0) {
            return 'EMPTY';
          } else {
            return this.lineItemCount;
          }
        }
        }
      ]
    }
  }
});

Template.QuoteSelect.events({
  "click .reactive-table tr": function (event) {

    if (event.target.className == 'select') {
      currentQuote = Quotes.insert({
        shipping: 0,
        invoiced: false,
        accountId: this._id,
        total: 0,
        subtotal: 0
      });
      Router.go('/quote/edit/' + currentQuote);
    }
    event.preventDefault();
  }
});

Template.QuotesAll.events({
  "click #newQuote": function () {
    Router.go('/quote/select');
  },
  "click .reactive-table tr": function (event, template) {
    if (event.target.className == 'delete' || event.target.parentNode.className == 'delete') {
      if (confirm('are you sure you want to delete quote W' + this.quoteId + '?')) {
        Quotes.update({_id : this._id}, {$set : {deleted: 1}});
      }
      return;
    }
    Template.instance().active.set(this._id);
  },
});

Template.QuotesEdit.helpers(quotesHelpers);
Template.QuotePrint.helpers(quotesHelpers);
Template.QuotesEdit.created = function () {
  this.active = new ReactiveVar(0);
};

Template.QuotesEdit.events({
  "click .table-responsive tr": function (event, template) {
    if (event.target.className == 'delete' || event.target.parentNode.className == 'delete') {
      if (confirm) {
        LineItems.remove({_id: this._id});
      }
      return;
    }
    Template.instance().active.set(this._id);
  },
  "blur #shipping": function (event, template) {

    //strip out commas and $ from the shipping so we store the shipping as a float
    var shipping = template.$(event.target).val().replace(/[$,]/g, "");
    Quotes.update(template.data.quote._id, {$set: {shipping: shipping}});
    Meteor.call('updateQuote', Session.get('currentQuoteId'));
  },
  "click #invoice": function (event, template) {
    Quotes.update(template.data.quote._id, {$set: {invoiced: true}});
  },
  "click #viewInvoice": function (event, template) {
    Router.go('/invoice/edit/' + template.data.quote._id);
  },
  "click #pdf": function (event, template) {

    var html = Blaze.toHTML(Blaze.With(template.data, function () {
      return Template.QuotePrint;
    }));
    Meteor.call('createPDF', html, function (err, res) {
      var item = PdfsCollection.findOne({_id : res});
      var blob = new Blob([item.pdf], {type: 'application/pdf'});
      saveAs(blob, 'test.pdf');
      PdfsCollection.remove({_id: item._id});
    });

    toastr.success('Your PDF will download shortly');

  },
  "click #email": function (event, template) {
    var email = AccountsCollection.findOne({_id: template.data.quote.accountId}).email;
    var html = Blaze.toHTML(Blaze.With(template.data, function () {
      return Template.QuotePrint;
    }));
    Meteor.call('emailPDF', html, email, 'Quote');
    toastr.success('Your email is being sent to ' + email);

  }
});