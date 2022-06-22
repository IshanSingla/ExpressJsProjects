const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    name: String,
    password: String,
    ballence: {
        type: Number,
        required: true,
        default: 0
    },
    orders: {
        type: Array,
        required: true,
        default: []
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});
UserSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return verificationToken;
};
module.exports = mongoose.model("users", UserSchema);