if (Meteor.isClient) {
    Meteor.subscribe('accounts');
    Meteor.subscribe('manufacturers');
    Template.appLayout.events({
        "click .logout" : function() {
            AccountsTemplates.logout();
            return false;
        }
    });
}