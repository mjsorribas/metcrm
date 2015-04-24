if (Meteor.isClient) {
  Meteor.subscribe('accountsCollection');
  Meteor.subscribe('contacts');
  Meteor.subscribe('manufacturers');
  Template.appLayout.events({
    "click .logout": function () {
      AccountsTemplates.logout();
      return false;
    }
  });
}