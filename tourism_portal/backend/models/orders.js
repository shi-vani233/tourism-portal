var mongoose = require('mongoose');
var OrderSchema = mongoose.Schema({
    email: { type: String, require: true },
    packname: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
}, {
    timestamp: true
})
module.exports = mongoose.model('orders', OrderSchema);