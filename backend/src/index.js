require('dotenv').config();

const express = require('express');
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
}

run().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        msg: "Welcome"
    })
});

const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

const mediaRouter = require('./routes/media');
app.use('/api/media', mediaRouter);

app.listen(process.env.PORT);