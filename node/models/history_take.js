const mongoose = require('mongoose');

const History_Take_Shema = new mongoose.Schema({
    user: String,
    items: JSON,
});

mongoose.model('History_Take', History_Take_Shema);