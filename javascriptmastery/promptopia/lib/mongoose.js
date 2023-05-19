import mongoose from "mongoose";

export function mongooseConnect() {
    const uri = process.env.MONGODB_URI;
    console.log(mongoose)
    mongoose.connect(uri)
    /*
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        return mongoose.connect(uri);
    }*/
}