//security, if the user is not logged in, render the login form.
Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.layout('login');
  } else {
    this.next();
  }
});


Router.configure({
  layoutTemplate: 'appLayout'
});

//routes start here

Router.map(function () {
  this.route('dashboard', {
    path: '/',
    waitOn: function () {
      return [
        Meteor.subscribe('accounts')
      ]
    }
  });
  this.route('accounts.new',
    {
      path: '/account/new',
      waitOn: function() {
        return [
          Meteor.subscribe('customerTypes')
        ]
      }
    });
  this.route('allAccounts', {
    path: '/accounts',
    waitOn: function () {
      return [
        Meteor.subscribe('accounts')
      ]
    }
  });
  this.route('accounts.view', {
    path: '/account/:_id',
    waitOn: function () {
      return [
        Meteor.subscribe('accounts'),
        Meteor.subscribe('contacts'),
        Meteor.subscribe('customerTypes')
      ];
    },
    data: function () {
      return {
        account: AccountsCollection.findOne({_id: this.params._id})
      }
    }
  });
  this.route('contacts.new',
    {path: '/contact/new',
      waitOn: function() {
        return [
          Meteor.subscribe('accounts')
        ]
      }
    }    );
  this.route('allContacts', {
    path: '/contacts',
    waitOn: function () {
      return [
        Meteor.subscribe('contacts'),
        Meteor.subscribe('accounts')
      ]
    }
  });
  this.route('contacts.view', {
    path: '/contact/:_id',
    waitOn: function () {
      return [
        Meteor.subscribe('contacts'),
        Meteor.subscribe('accounts')
      ];
    },
    data: function () {
      return {
        contact: Contacts.findOne({_id: this.params._id})
      }
    }
  });

  this.route('allManufacturers', {
    path: '/manufacturers',
    waitOn: function () {
      return [
        Meteor.subscribe('manufacturers')
      ]
    }
  });
  this.route('ManufacturerNew', {path: '/manufacturer/new'});

  this.route('allPackageTypes', {
    path: '/packagetypes',
    waitOn: function () {
      return [
        Meteor.subscribe('packageTypes')
      ]
    }
  });
  this.route('PackageTypeNew', {path: '/packagetype/new'});


  this.route('allProducts', {
    path: '/products',
    waitOn: function () {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('manufacturers'),
        Meteor.subscribe('packageTypes')
      ]
    }
  });
  this.route('ProductNew', {
    path: '/product/new'
  });

  this.route('products.view', {
    path: '/product/:_id',
    waitOn: function () {
      return [
        Meteor.subscribe('products'),
      ];
    },
    data: function () {
      return {
        contact: Products.findOne({_id: this.params._id})
      }
    }
  });
  this.route('quotes.all', {
    path: '/quotes',
    waitOn: function () {
      return [
        Meteor.subscribe('quotes'),
        Meteor.subscribe('lineItems'),
        Meteor.subscribe('accounts')
      ]
    }
  });
  this.route('quote.select',
    {
      path: '/quote/select',
      waitOn: function () {
        return Meteor.subscribe('accounts');
      }
    });

  this.route('quotes.edit', {
    path: '/quote/edit/:quoteId',
    waitOn: function () {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('accounts'),
        Meteor.subscribe('lineItems'),
        Meteor.subscribe('quotes')
      ]
    },
    data: function () {
      return {
        quote: Quotes.findOne({_id: this.params.quoteId}),
        docType: 'Quote'
      }
    }
  });

  this.route('invoices.edit', {
    template: 'QuotesEdit',
    path: '/invoice/edit/:quoteId',
    waitOn: function () {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('accounts'),
        Meteor.subscribe('lineItems'),
        Meteor.subscribe('quotes')
      ]
    },
    data: function () {
      return {
        quote: Quotes.findOne({_id: this.params.quoteId}),
        docType: 'Invoice'
      }
    }
  });

  this.route('invoices.all', {
    template: 'QuotesAll',
    path: '/invoices',
    waitOn: function () {
      return [
        Meteor.subscribe('quotes', {invoiced: true}),
        Meteor.subscribe('lineItems'),
        Meteor.subscribe('accounts')
      ]
    }
  });

  this.route('emailSettings', {
    path: '/settings/email',
    waitOn: function () {
      return [
        Meteor.subscribe('settings')
      ]
    }
  })


});

Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css('min-height', 0);
  }
};

var filters = Router._filters;

if (Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll);
}
