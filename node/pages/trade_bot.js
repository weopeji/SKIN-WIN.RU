const fetch = require('node-fetch');
const Promise = require('bluebird');
var SteamUser = require('steam-user');
const mongoose = require('mongoose');
var	SteamTotp = require('steam-totp');
var	SteamCommunity = require('steamcommunity');
var	TradeOfferManager = require('steam-tradeoffer-manager');
var	config = require('../config.json');
var	client = new SteamUser();
var	community = new SteamCommunity();
var	manager = new TradeOfferManager ({
	steam: client,
	community: community,
	language: 'en'
});	

var logOnOptions = {
	accountName: config.accounts[1].username,
	password: config.accounts[1].password,
	twoFactorCode: SteamTotp.generateAuthCode(config.accounts[1].sharedSecret)
};

client.logOn(logOnOptions);
	client.setOption("promptSteamGuardCode", false);
	client.on('loggedOn', () => {
	console.log("Бот в сети!");
	client.setPersona(SteamUser.EPersonaState.Online);
	client.gamesPlayed(["SKIN-WIN.RU", 440]);
});

client.on("friendMessage", function(steamID, message) { // Ответы бота на сообщения
	if (message == "hi") client.chatMessage(steamID, "Hello, how are you?");
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
	}
];

var Item = mongoose.model('Items');

const MF = {
	acceptOffer: function(offer) {
		offer.accept((err) => {
			community.checkConfirmations();
			console.log("We Accepted an offer");
			if (err) console.log("There was an error accepting the offer.");
		});
	},
	declineOffer: function(offer) {
		offer.decline((err) => {
			console.log("We Declined an offer");
			if (err) console.log("There was an error declining the offer.");
		});
	},
	mongoItemPost: function(query) {
		return Item.findOne(query);
	},
	mongoItemCreat: function(query) {
		return Item.create(query);
	},
	fetchPostItem: async function(url) {
		const res = await fetch(url);
		const data = await res.json();//assuming data is json
		return data;
	},
}

manager.on('newOffer', processTrade);

async function processTrade(offer) 
{
	var _exitGames 		= ["730", "570"];
	var offerId 		= offer.partner.getSteamID64();
	var length_items 	= offer.itemsToReceive.length;
	var all_items 		= [];
	var _error 			= false;

	offer.itemsToReceive.forEach(element => 
	{
		if(_exitGames.indexOf(element.appid) > -1) _error = true;
	});

	if(_error) { declineOffer(offer); return; };

	for (const element of offer.itemsToReceive) {
		let _item = await MF.mongoItemPost({ app_id: element.appid, market_hash_name: element.market_hash_name });
		if(!_item) 
		{ 
			var _urlSteamId = `https://steamcommunity.com/market/priceoverview/?currency=1&country=us&appid=${element.appid}&market_hash_name=${element.market_hash_name}&format=json`;
			let _fetch = await MF.fetchPostItem(_urlSteamId);
			if(!_fetch) { MF.declineOffer(offer); return; };
			if(!_fetch.success) { MF.declineOffer(offer); return; };
			if(typeof _fetch.lowest_price == "undefined") { MF.declineOffer(offer); return; };
			if(parseInt(_fetch.lowest_price.replace(/\D/g, '')) <= 0) { MF.declineOffer(offer); return; };
			await MF.mongoItemCreat({
				app_id: element.appid,
				context_id: element.context_id,
				market_hash_name: element.market_hash_name,
				price: parseInt(json.lowest_price.replace(/\D/g, '')),
				pricing_mode: "market",
				skewness: null,
				created_at: null,
				icon_url: "https://steamcommunity-a.akamaihd.net/economy/image/" + element.icon_url,
				name_color: element.name_color,
				quality_color: null,
				rarity_color: null,
				instant_sale_price: null
			});
			var newId = new mongoose.mongo.ObjectId();
			var element_full = {
				_id: newId,
				app_id: element.appid,
				market_hash_name: element.market_hash_name,
				icon_url: "https://steamcommunity-a.akamaihd.net/economy/image/" + element.icon_url,
				price: parseInt(json.lowest_price.replace(/\D/g, '')),
			};
			all_items.push(element_full);
		};
		var newId = new mongoose.mongo.ObjectId();
		var element_full = {
			_id: newId,
			app_id: _item.app_id,
			market_hash_name: _item.market_hash_name,
			icon_url: _item.icon_url,
			price: _item.price,
		};
		all_items.push(element_full);
	}
	MF.acceptOffer(offer);
	var History = mongoose.model('History_Take');
	var User = mongoose.model('User');
	History.create({ user: offerId, items: all_items});
	console.log(offerId);
	console.log(all_items);
	User.findOneAndUpdate({ user: offerId }, { $push: { items: {
		$each: all_items,
	}}}).then(data => {
		console.log(data);
	});
}