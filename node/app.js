var fs              = require('fs');
var mongoose        = require('mongoose');
var qs              = require('querystring');
var bodyParser      = require('body-parser');
var models          = require('./models');
var config_app      = require('./config.json');
var jwt             = require('jsonwebtoken');
var authHelper      = require('./helpers/authHelper');
var express         = require('express');
var http            = require('http');
var app             = express();

var server          = null;
var io              = null;

// cheach OS ==============================================================================
if(process.platform == 'win32') {config_app.secure = false} else {config_app.secure = true};

// creating server =========================================================================
if (config_app.secure)
{
    console.log('Server now!');
    var options = {
        key: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/skin-win.ru/chain.pem', 'utf8')
    };
    server = require('http').createServer(options, app);
    params = {
        path: '/socket.io'
    }
    io = require("socket.io")(server, params);
} else
{
    console.log('localhost now!');
    params = {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    }
    server = require('http').createServer(app);
    io = require("socket.io")(server, params);
}

// mongodb connecting =======================================================================
mongoose.connect(config_app.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() {
        console.log(`Mongo Db Connect to ${config_app.mongoUri}`);
        server.listen(config_app.appPort,
            () => {
                console.log(`Занят на сервере${config_app.appPort} порт...`);
                documentReadyRequire();
            }
        );
    })
    .catch(err => console.error(`Error connection to mogoDB: ${mongoUri}`, err));


// express ===================================================================================
app.get('/socket.io', function (req, res) {
    res.send('Socket io port ' + config_app.appPort);
});

app.get('/steam', function (req, res) {
    res.send('Socket io port ' + config_app.appPort);
});

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    return authHelper.replaceDbRefreshToken(userId)
    .then(() => ({
        accessToken
    }));
};

function auth(data, callback) {
    var User = mongoose.model('User');
    var user_Data = data;
    User.findOne({ user: user_Data })
    .then((user_all) => {
        if (!user_all) {
            User.create({ user: user_Data, verefication: false, items: []})
            .then(() => {
                updateTokens(user_Data).then(tokens => callback(tokens));
            });
        } else {
            updateTokens(user_Data).then(tokens => callback(tokens));
        }
    });
}

app.post('/steam', function (req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;               
    });
    req.on('end', function() {
        var POST = qs.parse(body);
        var steam_id = POST.steam_id;
        auth(steam_id, function(data) {
            res.json({"token": data.accessToken});
        });
    });
});

// trade_bot =================================================================================

//require('./pages/trade_bot');



// Socket IO data ============================================================================
var components_html     = null;

var documentReadyRequire = function() 
{
    if(components_html == null) {
        components_html = require('./pages/components');
        components_html.init({
            jwt: jwt,
            secret: config_app.secret,
            io: io,
            mongoose: mongoose,
        })
    };
}


var components_page = function components_page(socket,data,callback)
{
    if(components_html)
    {
        components_html.components_page(socket,data,callback);
    }
}

var trade_bot_page = function trade_bot_page(socket,data,callback)
{
    if(trade_bot_html)
    {
        trade_bot_html.trade_bot_page(socket,data,callback);
    }
}


io.on('connection', function(socket) {
    
    console.log('Conneting, socket: ' + socket.id);

    socket.on('components', function(data, callback) {
        components_page(this, data, callback);
    });

});