Template.allProducts.helpers({
    Products: function() {
        return Products;
    }
});

Template.allProducts.events({
    "click #newProduct": function() {
        Router.go('/product/new');
    }
});

Template.allProducts.helpers({
    tableSettings: function() {
        return {
            collection: Products.find(),
            rowsPerPage: 10,
            fields: [
                { key: 'itemNumber', label: 'Item #'},
                { key: 'price', label: 'Price' },
                { key: 'extendedPrice', label: 'Extended Price' },
                { key: 'qty', label: 'Qty' },
                { key: 'dateCode', label: 'Date Code' },
                { key: 'bin', label: 'Bin' },
                { key: 'manufacturer', label: 'Manufacturer', fn: function(value, object) { return Manufacturers.findOne({_id: object.manufacturer}).name }},
                { key: 'packageType', label: 'Package Type', fn: function(value, object) { return PackageTypes.findOne({_id: object.packageType}).name }},
            ]
        }
    }
});

AutoForm.hooks({
    insertProductForm: {
        after: {
            insert: function(error, result) {
                if (!error) {
                    Router.go('/products');
                }
            }
        }
    }
});