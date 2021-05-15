const mongoose = require('mongoose');

const Items_Shema = new mongoose.Schema({
    app_id: String,
    context_id: String,
    market_hash_name: String,
    price: String,
    pricing_mode: String,
    skewness: String,
    created_at: Number,
    icon_url: String,
    name_color: String,
    quality_color: String,
    rarity_color: String,
    instant_sale_price: String
});

mongoose.model('Items', Items_Shema);