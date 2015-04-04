Template.allPackageTypes.helpers({
    PackageTypes: function() {
        return PackageTypes;
    }
});

Template.allPackageTypes.events({
    "click #newPackageType": function() {
        Router.go('/packagetype/new');
    }
});

AutoForm.hooks({
    insertPackageTypeForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/packagetypes/');
                }
            }
        }
    }
});