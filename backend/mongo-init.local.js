db.createUser(
    {
        user: 'tilas'
        pwd: 'tilas',
        roles: [
            {
                role: "readWrite",
                db: 'tilas'
            }
        ]
    }
);