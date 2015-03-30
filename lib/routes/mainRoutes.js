
//security, if the user is not logged in, render the login form.
Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.layout('login');
    } else {
        this.next();
    }
});

Router.configure({
    layoutTemplate : 'appLayout'
});

//routes start here

Router.map(function() {
    this.route('dashboard', {path: '/'});
    this.route('accounts.new', {path: '/account/new'});
    this.route('allAccounts', {
        path: '/accounts',
        waitOn: function() {
            return [
                Meteor.subscribe('accounts')
            ]
        }
    });
    this.route('accounts.view', {
        path: '/account/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('accounts'),
                Meteor.subscribe('contacts')
            ];
        },
        data: function() {
            return {
                account: Accounts.findOne({_id : this.params._id})
            }
        }
    });
    this.route('contacts.new', {path: '/contact/new'});
    this.route('allContacts', {
        path: '/contacts',
        waitOn: function() {
            return [
                Meteor.subscribe('contacts')
            ]
        }
    });
    this.route('contacts.view', {
        path: '/contact/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('contacts'),
            ];
        },
        data: function() {
            return {
                contact: Contacts.findOne({_id : this.params._id})
            }
        }
    });

    this.route('allManufacturers', {
        path: '/manufacturers',
        waitOn: function() {
            return [
                Meteor.subscribe('manufacturers')
            ]
        }
    });
    this.route('ManufacturerNew', {path: '/manufacturer/new'});

    this.route('allProducts', {
        path: '/products',
        waitOn: function() {
            return [
                Meteor.subscribe('products'),
                Meteor.subscribe('manufacturers')
            ]
        }
    });
    this.route('ProductNew', {path: '/product/new'});

    this.route('products.view', {
        path: '/product/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('products'),
            ];
        },
        data: function() {
            return {
                contact: Products.findOne({_id : this.params._id})
            }
        }
    });

});

Router._filters = {
    resetScroll: function() {
        var scrollTo = window.currentScroll || 0;
        $('body').scrollTop(scrollTo);
        $('body').css('min-height', 0);
    }
};

var filters = Router._filters;

if(Meteor.isClient) {
    Router.onAfterAction(filters.resetScroll);
}
