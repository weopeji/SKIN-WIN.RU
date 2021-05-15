const mongoose  = require('mongoose');
const User_Item = require('./user_item');

const UserShema = new mongoose.Schema({
    user: String,
    verefication: Boolean,
    items: [User_Item.schema],
});

mongoose.model('User', UserShema);