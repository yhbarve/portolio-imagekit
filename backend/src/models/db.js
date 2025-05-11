const mongoose = require("mongoose");

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
}

run().catch((err) => console.log(err));