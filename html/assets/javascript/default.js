(function (global) {

    global.myColors = ["#00A5F0", "#FCF901", "#A22B3F", "#46AF7A", "#F417F2"];
    global.myVinyls = {
        "blue": 25,
        "yellow": 25,
        "red": 25,
        "green": 25,
        "purple": 25,
    };
    global.Auth = false;
    global.page = new Array();
    global.put_items = new Array();
    global.put_global_items = new Array();
    global.game = new Array();

    (() => {
        delete imSocket;
        imSocket = null;
        var url = null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            url = global_data.data_url_localhost;
            imSocket = io(url, {transports: ['polling']});
        } else {
            url = global_data.data_url_server;
            imSocket = io(url, {
                path: '/socket.io'
            });
        }
        imSocket.on('connect', function() {
            console.log("Сервер подключен к: " + url);
            global.loadResources(['./assets/javascript/components.js'], () => {
                global.loadResources(['./assets/javascript/games/spinner_game.js'], () => {
                    if(global.getCookie('token')) {global.Auth = true} else {global.Auth = false};
                    Main();
                });
            });
        });
    })();

    function Main()
    {
        const DATA      = new global.Components.Get_All_Data();
        const header    = new global.Components.Header_Block();
        const inventory = new global.Components.Inventory_Block();
        const chat      = new global.Components.Chat_Block();
        const spinner   = new global.Components.Spinner_Game();
        const Cabinet   = new global.Components.Cabinet();

        (async () => {
            if(Auth) {
                page.user = await DATA.User({
                    token: getCookie('token'),
                    data_id: global_data.data_id,
                });
                page.user.inventory = await DATA.Inventory({
                    token: getCookie('token')
                });
            }

            page.header = await DATA.Header();
            
            Promise.all([
                new Promise(resolve => Header(resolve)),
                new Promise(resolve => Inventory(resolve)), 
                new Promise(resolve => Chat(resolve)),
                new Promise(resolve => Spinner_Game(resolve)),
                new Promise(resolve => Cabinet_page(resolve)),
            ]).then(() => {
                $('.preloader').css("display", "none");
            });
        })();
        
        async function Header(resolve) { // HEADER ===========================
            var header_block = await header.render();
            $('.index_page_header_in').empty().append(header_block);
            $('.index_page_header_right_left_block').click( function() {
                Cabinet.start();
            });
            resolve();
        };

        async function Inventory(resolve) { // Inventory ===========================
            var inventory_block = await inventory.render();
            $('.left_block').empty().append(inventory_block);
            $('.switch_items').on('click', function() {
                inventory.take_all($('#inventory_checkbox').is(':checked'));
            });
            resolve();
        };

        async function Chat(resolve) { // chat ===========================
            var chat_block = await chat.render();
            $('.right_block').empty().append(chat_block);
            imSocket.on('chat', data => {
                $('.chat_body').append(chat.take_msg(data));
                $('.chat_body').animate({ scrollTop: $('.chat_body').height() }, "fast");
            });
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    if($('#chat').is(":focus")) {
                        chat.chat_block();
                    }
                }
            });
            resolve();
        };


        async function Spinner_Game(resolve) { // spinner_game ==========================

            // =======================================================
            var spinner_block = await spinner.render();
            $('.centr_block').empty().append(spinner_block);
            var game_data = await spinner.get_data();
            game = game_data;
            default_spinner(document.getElementById("game"), myVinyls, myColors);
            // =======================================================

            if(game.status) spinner.render_start_true(); // запуск если есть активная игра

            $('.centr_block_game_bottom_button').click( function() {
                spinner.start(DATA);
            });



            var need_time = true;
            function timer_game() {
                if(need_time) {
                    need_time = false;
                    var seconds = 10;
                    var seconds_timer_id = setInterval(function() {
                        seconds --;
                        $('#blink').html(seconds);
                        if(seconds <= 0) {
                            $('#blink').html('СТАРТ');
                            clearInterval(seconds_timer_id);  
                        }
                    }, 1000);
                }
            }



            imSocket.on('start_new_game', function(data) { // new game =============
                game = data;
                spinner.render_start_true(data);
            });

            imSocket.on('add_player', function(data) { // добавили игрока ===========
                game = data;
                timer_game();
                spinner.render_add_player(data);
            });

            imSocket.on('close_game', function(data) { // получен победитель ==============
                game = data.game;
                spinner.start_animation(data.winner_data);
            });

            imSocket.on('end_game', async function(data) { // удаление игры =====================
                game = data.game;
                need_time = true;
                spinner.render_again();
                if(Auth) {
                    page.user.inventory = await DATA.Inventory({
                        token: getCookie('token')
                    });
                    inventory.auth_render();
                }
            });

            resolve();
        };

        async function Cabinet_page(resolve) {
            if(Auth) {
                var Cabinet_render = await Cabinet.render();
            }
            resolve();
        }
    }

}(window))




