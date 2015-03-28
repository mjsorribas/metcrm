if (Meteor.isServer) {
    if (Meteor.users.find().count() === 1) {
        console.log('test');
        Accounts.createUser({
            username: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        });
    }
}