const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const UserShema = new mongoose.Schema({
    date: String,
    players: Array,
    winner_id: String,
    winner_money: Number,
});

autoIncrement.initialize(mongoose.connection);
UserShema.plugin(autoIncrement.plugin, 'Spinner_Game');
mongoose.model('Spinner_Game', UserShema);