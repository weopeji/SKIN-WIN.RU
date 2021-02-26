const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    user: String,
    verefication: Boolean,
    items: Array,
});

mongoose.model('User', UserShema);