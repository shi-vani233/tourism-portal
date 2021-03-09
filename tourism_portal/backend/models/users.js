var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    phone_no: { type: Number, require: true },
    email: { type: String, require: true }
}, {
    timestamp: true
})

UserSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('users', UserSchema);