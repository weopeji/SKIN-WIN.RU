const mongoose = require('mongoose');

const User_Item_Shema = new mongoose.Schema({
    _id: String,
    app_id: String,
    market_hash_name: String,
    icon_url: String,
    price: String,
});

module.exports = mongoose.model('User_Item', User_Item_Shema);