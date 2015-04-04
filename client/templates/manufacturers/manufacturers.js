Template.allManufacturers.helpers({
    Manufacturers: function() {
        return Manufacturers;
    }
});

Template.allManufacturers.events({
    "click #newManufacturer": function() {
        Router.go('/package/new');
    }
});

AutoForm.hooks({
    insertManufacturerForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/manufacturers/');
                }
            }
        }
    }
});