import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

interface Idb {
    mongoose: any;
    user: any;
    role: any;
    ROLES: string[]|undefined;
}

const db: Idb = {
    mongoose: mongoose,
    user: require("./user.model"),
    role: require("./role.model"),
    ROLES: ["user", "admin", "moderator"],
};

export default db;