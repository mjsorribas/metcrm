
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

Router.route('/', function () {
    name: 'Dashboard',
    this.render('dashboard');
});

Router.route('/real', function () {

    this.render('real', {
        data: function() {
            return {title : 'hhmmmm'};
        }
    });
});

Router.route('/logout', function(){
   AccountsTemplates.logout();
});