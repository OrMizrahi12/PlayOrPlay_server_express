const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ormizrahi:om16101997@cluster0.yqovt.mongodb.net/GameOrGame", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB