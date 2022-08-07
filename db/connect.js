const mongoose = require('mongoose');

const connectDB = (URI) => {
    return mongoose.connect(URI);
}

module.exports = connectDB;