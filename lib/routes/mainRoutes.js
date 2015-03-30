
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
    this.route('accounts.view', {
        path: '/account/:_id',
        waitOn: function() {
            return Meteor.subscribe('accounts');
        },
        data: function() {
            return {
                account: Accounts.findOne({_id : this.params._id})
            }
        }
    });
    this.route('contacts.new', {path: '/contact/new'});
    this.route('contacts.view', {
        path: '/contact/:_id',
        waitOn: function() {
            return Meteor.subscribe('contacts');
        },
        data: function() {
            return {
                contact: Contacts.findOne({_id : this.params._id})
            }
        }
    });

});


