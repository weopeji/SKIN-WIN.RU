var fetch           = null;
var jwt             = null;
var secret          = null;
var io              = null;
var mongoose        = null;
var Spinner_Game    = null;
var User            = null;

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    }
}


function privateInit(initPlagins) {
    fetch           = require('node-fetch');
    jwt             = initPlagins.jwt;
    secret          = initPlagins.secret;
    io              = initPlagins.io;
    mongoose        = initPlagins.mongoose;
    Spinner_Game    = mongoose.model('Spinner_Game');
    User            = mongoose.model('User');
}

var action_linker = {
    "header": header,
    "User": User_get,
    "msg": Msg,
    "inventory": inventory,
    "data_game": data_game,
    "start_game": start_game,
}


var privat_index_page = function(socket,data,callback) {
    var action = data.action;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action](socket,data.data,callback,data)   
    } else {
        callback({
            error: {
                code:0 //no action
            }
        });
    }
}

function User_get(socket, data, callback) 
{
    var userId = jwt.verify(data.token, secret).userId;
    User.findOne({ user: userId })
    .then((UserData) => {
        if(!UserData) {callback("error"); return};
        var user_url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ data.data_id +"&steamids=" + userId;
        fetch(user_url)
        .then(res => res.json())
        .then((json) => {
            var client = json.response.players[0];
            callback({
                "userId": userId,
                "name": client.personaname,
                "avatarfull": client.avatarfull,
                "verification": UserData.verefication,
            });
        });
    });
}

function header(socket, data, callback) 
{
    var clients = Object.keys(socket.nsp.server.engine.clients).length;
    var cb_data = {
        "clients": clients,
        "top": 0,
        "money": 0,
        "games": 0,
    }
    callback(cb_data);
}

function Msg(socket, data, callback) 
{
    var userId = jwt.verify(data.user, secret).userId;
    var msg = data.msg;
    var user_url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ data.data_id +"&steamids=" + userId;
    fetch(user_url)
        .then(res => res.json())
        .then((data_steam) => {

            var name    = data_steam.response.players[0].personaname;
            var img     = data_steam.response.players[0].avatarfull;

            io.emit('chat', {
                name: name,
                img: img,
                msg: msg,
                time: new Date(),
            });
        });
}

function inventory(socket, data, callback) 
{
    var userId = jwt.verify(data.token, secret).userId;
    User.findOne({ user: userId })
    .then((UserData) => {
        if(!UserData) {callback("error"); return};
        callback(UserData.items);
    });
}

function data_game(socket, data, callback)
{
    callback(game);
}













// ========================================================================================


var game = {
    _id: null,
    status: false,
    stage: "free",
    need_start: true,
    time: {
        wait: 10,
        animate: 10,
        now: 0,
    },
    size: {
        maxPlayers: 5,
        minPlayers: 2,
    },
    players: new Array(),
};




const SpFun = {
    user: {
        getUser: function(userId) {
            return User.findOne({user: userId});
        },
    },
    game: {
        removeItemUser: async function(userId, items) {
            return User.findOneAndUpdate({user: userId}, { $pull: { items: {_id: {$in: items}}}});
        },
        new_game: function() {
            return Spinner_Game.create({
                date: new Date(),
                players: game.players,
                winner_id: null,
                winner_money: 0,
            });
        },
        add_player: async function(data, userId) {
            var add_item = {
                userId: userId,
                user: {
                    name: data.user.name,
                    img: data.user.avatarfull,
                },
                items: data.items,
            };
            var _idItems = new Array();
            add_item.items.forEach(element => {
                _idItems.push(element._id);
            });  
            await SpFun.game.removeItemUser(userId, _idItems);
            game.players.push(add_item);
            return Spinner_Game.findOneAndUpdate({_id: game._id}, { $push: { players: add_item }});
        },
        timer: {
            randomInteger: function(min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                return Math.round(rand);
            },
            getAllDataUsers: function()
            {
                var all_users = new Array();
                game.players.forEach(element => {
                    var money = 0;
                    element.items.forEach(item => {
                        money = money + parseFloat(item.price);
                    });
                    all_users.push({
                        userId: element.userId,
                        money: money,
                    });
                });
                var all_money = 0;
                all_users.forEach(element => {
                    all_money = all_money + element.money;
                });
                var free_data = new Array();
                all_users.forEach(element => {
                    var deg = (element.money * 100) / all_money;
                    free_data.push({
                        userId: element.userId,
                        money: element.money,
                        deg: Math.ceil(deg),
                    });
                });
                var blocks = 0;
                free_data.forEach(element => {
                    blocks = blocks + element.deg;
                });
                var all_data = {
                    blocks: blocks,
                    users: free_data
                };
                var needData = new Array();
                for(var i = 0; i < all_data.users.length; i++) {
                    for(var a = 0; a < all_data.users[i].deg; a++) {
                        needData.push(all_data.users[i].userId);
                    }
                }
                needData = needData.sort(() => Math.random() - 0.5);
                var winner = SpFun.game.timer.randomInteger(0, all_data.blocks);
                return {
                    winner: winner,
                    data: needData
                };
            },
            default: function() {
                var seconds = game.time.wait + game.time.animate;
                var seconds_timer_id = setInterval(async function() {
                    seconds --;
                    game.time_now = seconds;
                    if(seconds == game.time.wait) 
                    {
                        game.stage = "start";
                        var getWinnerAndData = SpFun.game.timer.getAllDataUsers();
                        var _idWinner = getWinnerAndData.data[getWinnerAndData.winner];
                        await Spinner_Game.updateOne({_id: game._id}, {winner_id: _idWinner});
                        var allItemsPush = [];
                        game.players.forEach(element => {
                            element.items.forEach(elItems => {
                                allItemsPush.push(elItems);
                            });
                        });
                        await User.updateOne({user: _idWinner}, { $push: {items: {
                            $each: allItemsPush
                        }}});
                        io.emit('close_game', {
                            winner_data: {
                                users: getWinnerAndData.data,
                                winner: getWinnerAndData.winner,
                                winner_id: _idWinner,
                            },
                            game: game,
                            text: 'Игра закрыта',
                        });
                    }
                    if(seconds < 0) 
                    {
                        game = {
                            _id: null,
                            status: false,
                            stage: "free",
                            need_start: true,
                            time: {
                                wait: 10,
                                animate: 10,
                                now: 0,
                            },
                            size: {
                                maxPlayers: 5,
                                minPlayers: 2,
                            },
                            players: new Array(),
                        };
                        io.emit('end_game', {
                            game: game
                        });
                        clearInterval(seconds_timer_id);  
                    }
                }, 1000);
            }
        }
    },
}

async function start_game(socket, data, callback)
{
    var error = { type: false };

    var userId = jwt.verify(data.token, secret).userId;
    var _User = await SpFun.user.getUser(userId);

    // errors ============================================================

    if(!_User) {
        error = {
            type: true,
            text: "Вы заблокированы!",
        };
    } else {
        for (const element of data.items) 
        { 
            let NeedElement = _User.items.find(item => item._id == element._id);
            if(typeof NeedElement == "undefined") {
                error = {
                    type: true,
                    text: "У вас нет этого предмета!",
                };
            }
        }
    }

    if(game.players) {

        // game.players.forEach(element => {
        //     if(element.userId == userId) {
        //         error = {
        //             type: true,
        //             text: "Вы уже сделали ставку!",
        //         };
        //     }
        // });

        if(game.players.length >= 5) {
            error = {
                type: true,
                text: "Превышен лимит игроков",
            };
        }
    
        if(game.stage == "start") 
        {
            error = {
                type: true,
                text: "Игра уже идет!",
            };
        }
    }

    if(error.type) {
        callback({
            status: false,
            error: error.text,
        });
        return;
    }

    // ====================================================================


    if(!game.status) 
    {
        var _Game = await SpFun.game.new_game();
        game.status = true;
        game.stage = "wait";
        game._id = _Game._id;
        await SpFun.game.add_player(data, userId);
        io.emit('start_new_game', game);
    } 
    else if(game.status) 
    {
        await SpFun.game.add_player(data, userId);
        io.emit('add_player', game);
        if(game.need_start) {
            game.need_start = false;
            SpFun.game.timer.default();
        };
    }

    
    callback({
        status: 'ok',
    });
    

}