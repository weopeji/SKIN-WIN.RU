const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    items: JSON,
});

mongoose.model('History_Take', UserShema);