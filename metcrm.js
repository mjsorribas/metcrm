if (Meteor.isClient) {
    Meteor.subscribe('accounts');
    Template.appLayout.events({
        "click .logout" : function() {
            AccountsTemplates.logout();
            return false;
        }
    });
}