import mongoose from 'mongoose';

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: String, 
        lastName: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;