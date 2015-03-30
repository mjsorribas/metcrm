if (Meteor.isClient) {
    Meteor.subscribe('accounts');
    Meteor.subscribe('contacts');
    Meteor.subscribe('manufacturers');
    Template.appLayout.events({
        "click .logout" : function() {
            AccountsTemplates.logout();
            return false;
        }
    });
}