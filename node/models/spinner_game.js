const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const Spinner_Game_Shema = new mongoose.Schema({
    date: String,
    players: Array,
    winner_id: String,
    winner_money: Number,
});

autoIncrement.initialize(mongoose.connection);
Spinner_Game_Shema.plugin(autoIncrement.plugin, 'Spinner_Game');
mongoose.model('Spinner_Game', Spinner_Game_Shema);