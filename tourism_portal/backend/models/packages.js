var mongoose = require('mongoose');
var PackageSchema = mongoose.Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true },
    state: { type: String, require: true }
}, {
    timestamp: true
})
module.exports = mongoose.model('packages', PackageSchema);