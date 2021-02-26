var SteamUser = require('steam-user');
const mongoose = require('mongoose');
var	SteamTotp = require('steam-totp');
var	SteamCommunity = require('steamcommunity');
var	TradeOfferManager = require('steam-tradeoffer-manager');
var	config = require('../config.json');
var	client = new SteamUser();
var	community = new SteamCommunity();
const { default: fetch } = require('node-fetch');
var	manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en'
});	

var logOnOptions = {
	accountName: config.accounts[0].username,
	password: config.accounts[0].password,
	twoFactorCode: SteamTotp.generateAuthCode(config.accounts[0].sharedSecret)
};

var items = {
	csgo: require('../items_prices/csgo.json').prices,
	Depth: require('../items_prices/Depth.json').prices,
	KillingFloor2: require('../items_prices/KillingFloor2.json').prices,
	PayDay2: require('../items_prices/PayDay2.json').prices,
	Rust: require('../items_prices/Rust.json').prices,
	TeamFortress2: require('../items_prices/TeamFortress2.json').prices,
	Unturned: require('../items_prices/Unturned.json').prices,
	Z1BattleRoyale: require('../items_prices/Z1BattleRoyale.json').prices,
} 

const need_games = [
	{
		"name": "PayDay2",
		"appId": "218620",
	},
	{
		"name": "KillingFloor2",
		"appId": "232090",
	},
	{
		"name": "Depth",
		"appId": "274940",
	},
	{
		"name": "Unturned",
		"appId": "304930",
	},
	{
		"name": "TeamFortress2",
		"appId": "440",
	},
	{
		"name": "Rust",
		"appId": "252490",
	},
	{
		"name": "Z1BattleRoyale",
		"appId": "433850",
	},
	{
		"name": "csgo",
		"appId": "730",
	}
];

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        trade_bot_page(socket,data,callback);
    }
}


client.logOn(logOnOptions);
	client.setOption("promptSteamGuardCode", false);
	client.on('loggedOn', () => {
	console.log("Бот в сети!");
	client.setPersona(SteamUser.EPersonaState.Online);
	client.gamesPlayed(["SKIN-WIN.RU", 440]);
});

client.on("friendMessage", function(steamID, message) { // Ответы бота на сообщения
	if (message == "hi") {
		client.chatMessage(steamID, "Hello, how are you?");
	}
});

client.on('webSession', (sessionid, cookies) => {

	manager.setCookies(cookies, function(err) {

		if (err) {
			console.log(err);
			process.exit(1);
			return;
		}

		console.log("Got API key: " + manager.apiKey);
	});
	community.setCookies(cookies);
	community.startConfirmationChecker(20000, config.identitySecret);
});

function acceptOffer(offer) {
	offer.accept((err) => {
		community.checkConfirmations();
		console.log("We Accepted an offer");
		if (err) console.log("There was an error accepting the offer.");
	});
}
 
function declineOffer(offer) {
	offer.decline((err) => {
		console.log("We Declined an offer");
		if (err) console.log("There was an error declining the offer.");
	});
}



manager.on('newOffer', (offer) => {

	var offerId = offer.partner.getSteamID64();

	var all_items = [];

	console.log("В обмене вещей: " + offer.itemsToReceive.length);

	var error = false;

	offer.itemsToReceive.forEach(element => {

		if(element.appid == "218620" || "232090" || "274940" || "304930" || "440" || "252490" || "433850" || "730")
		{
			var needLibrary = null;

			if(element.appid == "218620") needLibrary 			= items.PayDay2;
			if(element.appid == "232090") needLibrary 			= items.KillingFloor2;
			if(element.appid == "274940") needLibrary			= items.Depth;
			if(element.appid == "304930") needLibrary			= items.Unturned;
			if(element.appid == "440") needLibrary				= items.TeamFortress2;
			if(element.appid == "252490") needLibrary			= items.Rust;
			if(element.appid == "433850") needLibrary			= items.Z1BattleRoyale;
			if(element.appid == "730") needLibrary				= items.csgo;

			var result = needLibrary.filter(function(el){
				return el.market_hash_name.indexOf(element.market_hash_name) > -1;
			});

			var price_item;

			result.forEach(result_element => {
				if(element.market_hash_name == result_element.market_hash_name) {
					price_item = result_element.price;
				}
			});

			var newId = new mongoose.mongo.ObjectId();
			
			var element_full = {
				_id: newId,
				app_id: element.appid,
				market_hash_name: element.market_hash_name,
				icon_url: "https://steamcommunity-a.akamaihd.net/economy/image/" + element.icon_url,
				price: price_item,
			};

			if(element_full.price == undefined) error = true;

			all_items.push(element_full);

		} else {
			console.log('Вещ не из нужной игры!');
			error = true;
		}

	});

	if(error) {
		declineOffer(offer);
	} else {

		var endData = {
			"user": offerId,
			"items": all_items,
		}

		var History = mongoose.model('History_Take');
		var User = mongoose.model('User');

		History.create({ user: offerId, items: all_items});
		User.findOne({ user: offerId }).then((need_user) => {
			if(!need_user) {console.log("Error"); return};
			User.useFindAndUpdate({ user: offerId }, { $push: { items: all_items }}).then(data => {
				acceptOffer(offer);
			});
		});
		
	}

});

