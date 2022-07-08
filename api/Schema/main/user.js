const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        default: "test@inducedofficial.com"
    },
    name: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: "test@inducedofficial.com"
    },
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
    transiction: {
        type: Array,
        required: true,
        default: []
    },
    subscribtions: {
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