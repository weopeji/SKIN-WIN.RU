(function (global) {
    "use strict";

    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    class Get_All_Data
    {
        constructor() {};

        Header(data) 
        {
            if(!data) data = {};
            return callApi({
                methodName: 'header',
                data: data,
            }).then((data) => {
                return data; 
            });
        };

        User(data)
        {
            if(!data) data = {};
            return callApi({
                methodName: 'User',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

        Inventory(data)
        {
            if(!data) data = {};
            return callApi({
                methodName: 'inventory',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

    }


    class Header_Block {

        constructor() {

            this.online = "header_online";
            this.top    = "header_top";
            this.games  = "header_games";
            this.money  = "header_money";

            this.steam_block = "steam_block";

            this.verification = $(`
                <div class="verification_block">
                    <img src="./assets/css/images/all/check.svg" alt=""></img>
                </div>
            `);

            this.$component = $(`
                <div class="index_page_header_left">
                    <span class="logo">Skin<a>WIN</a></span>
                    <div class="socail_buttons_block">
                        <div class="vk_auth vk_auth_href">
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="100px" height="100px">    <path d="M19.952,5.672c-1.904-1.531-4.916-1.79-5.044-1.801c-0.201-0.017-0.392,0.097-0.474,0.281 c-0.006,0.012-0.072,0.163-0.145,0.398c1.259,0.212,2.806,0.64,4.206,1.509c0.224,0.139,0.293,0.434,0.154,0.659 c-0.09,0.146-0.247,0.226-0.407,0.226c-0.086,0-0.173-0.023-0.252-0.072C15.584,5.38,12.578,5.305,12,5.305S8.415,5.38,6.011,6.872 c-0.225,0.14-0.519,0.07-0.659-0.154c-0.14-0.225-0.07-0.519,0.154-0.659c1.4-0.868,2.946-1.297,4.206-1.509 c-0.074-0.236-0.14-0.386-0.145-0.398C9.484,3.968,9.294,3.852,9.092,3.872c-0.127,0.01-3.139,0.269-5.069,1.822 C3.015,6.625,1,12.073,1,16.783c0,0.083,0.022,0.165,0.063,0.237c1.391,2.443,5.185,3.083,6.05,3.111c0.005,0,0.01,0,0.015,0 c0.153,0,0.297-0.073,0.387-0.197l0.875-1.202c-2.359-0.61-3.564-1.645-3.634-1.706c-0.198-0.175-0.217-0.477-0.042-0.675 c0.175-0.198,0.476-0.217,0.674-0.043c0.029,0.026,2.248,1.909,6.612,1.909c4.372,0,6.591-1.891,6.613-1.91 c0.198-0.172,0.5-0.154,0.674,0.045c0.174,0.198,0.155,0.499-0.042,0.673c-0.07,0.062-1.275,1.096-3.634,1.706l0.875,1.202 c0.09,0.124,0.234,0.197,0.387,0.197c0.005,0,0.01,0,0.015,0c0.865-0.027,4.659-0.667,6.05-3.111 C22.978,16.947,23,16.866,23,16.783C23,12.073,20.985,6.625,19.952,5.672z M8.891,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913s1.674,0.857,1.674,1.913S9.816,14.87,8.891,14.87z M15.109,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913c0.924,0,1.674,0.857,1.674,1.913S16.033,14.87,15.109,14.87z"/></svg>
                        </div>
                        <div class="vk_auth discord_auth_href">
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="100px" height="100px"><path d="M45.763,35.202c-1.797-3.234-6.426-7.12-8.337-8.811c-0.523-0.463-0.579-1.264-0.103-1.776 c3.647-3.919,6.564-8.422,7.568-11.143C45.334,12.27,44.417,11,43.125,11l-3.753,0c-1.237,0-1.961,0.444-2.306,1.151 c-3.031,6.211-5.631,8.899-7.451,10.47c-1.019,0.88-2.608,0.151-2.608-1.188c0-2.58,0-5.915,0-8.28 c0-1.147-0.938-2.075-2.095-2.075L18.056,11c-0.863,0-1.356,0.977-0.838,1.662l1.132,1.625c0.426,0.563,0.656,1.248,0.656,1.951 L19,23.556c0,1.273-1.543,1.895-2.459,1.003c-3.099-3.018-5.788-9.181-6.756-12.128C9.505,11.578,8.706,11.002,7.8,11l-3.697-0.009 c-1.387,0-2.401,1.315-2.024,2.639c3.378,11.857,10.309,23.137,22.661,24.36c1.217,0.12,2.267-0.86,2.267-2.073l0-3.846 c0-1.103,0.865-2.051,1.977-2.079c0.039-0.001,0.078-0.001,0.117-0.001c3.267,0,6.926,4.755,8.206,6.979 c0.368,0.64,1.056,1.03,1.8,1.03l4.973,0C45.531,38,46.462,36.461,45.763,35.202z"/></svg>
                        </div>
                    </div>
                </div>

                <div class="index_page_header_centr">
                    <div class="index_page_header_block">
                        <img src="./assets/css/images/header/win.svg" alt="">
                        <div class="header_text">
                            <span class="header_text_up" id="${this.top}"></span><span> $</span>
                            <span class="header_text_bottom">Лучший выигрыш</span>
                        </div>
                    </div>

                    <div class="index_page_header_block">
                        <img src="./assets/css/images/header/money_game.svg" alt="">
                        <div class="header_text">
                            <span class="header_text_up" id="${this.money}"></span><span> $</span>
                            <span class="header_text_bottom">Денежный оборот</span>
                        </div>
                    </div>

                    <div class="index_page_header_block">
                        <img src="./assets/css/images/header/online.svg" alt="">
                        <div class="header_text">
                            <span class="header_text_up" id="${this.games}"></span>
                            <span class="header_text_bottom">Игр за все время</span>
                        </div>
                    </div>

                    <div class="index_page_header_block">
                        <img src="./assets/css/images/header/games.svg" alt="">
                        <div class="header_text">
                            <span class="header_text_up" id="${this.online}"></span>
                            <span class="header_text_bottom">Онлайн</span>
                        </div>
                    </div>
                </div>


                <div class="index_page_header_right">

                    <div class="index_page_header_right_left_block">
                        <span>Профиль</span>
                    </div>

                    <div class="header_user_block" id="${this.steam_block}">

                        <div class="user_steam">
                            <img src="./assets/css/images/header/steam.svg" alt="">
                            <span>Войти через Steam</span>
                        </div>

                        <div class="user_header_block">
                            <div class="user_header_block_right">
                                <div class="user_header_auth_block">
                                    <span>name</span>
                                    <div class="user_header_block_img"></div>
                                </div>
                                <img src="./assets/css/images/header/close.png" class="user_header_block_close" alt=""> 
                            </div>                   
                        </div>
                    </div>
                </div>
            `);

        };

        info_block() {
            this.$component.find("#" + this.online).append(page.header.clients);
            this.$component.find("#" + this.games).append(page.header.games);
            this.$component.find("#" + this.top).append(page.header.top);
            this.$component.find("#" + this.money).append(page.header.money);
        }

        login_block() {
            if(Auth) {
                this.$component.find('.user_header_block_close').on("click", function() {
                    global.delCookie('token');
                });
                $('.index_page').addClass('logined');
                this.$component.find('.user_header_block span').empty().append(page.user.name);
                this.$component.find('.user_header_block_img').empty().append(`<img src="${page.user.avatarfull}" alt=""></img>`);
            } else {
                this.$component.find('.user_steam').on("click", function() {
                    location.href = './steam.php';
                });
            }
        }

        logo_block() {
            this.$component.find('.vk_auth_href').click( function() {
                location.href = "https://vk.com/skinwinru";
            });
            this.$component.find('.discord_auth_href').click( function() {
                location.href = "https://vk.com/skinwinru";
            });
        }

        async render() {
            this.logo_block();
            this.info_block();
            this.login_block(); 
            return this.$component;
        }

    }

    class Inventory_Block {

        constructor() {

            this.take_skins_cash = "take_skins_cash";
            this.take_skins_how = "take_skins_how";

            this.$component = $(`
                <div class="left_menu_header">
                    <div class="left_menu_header_info">
                        <div class="centr_block_game_intro">
                            <div class="centr_block_game_intro_text">
                                <p>Общая сумма</p>
                                <span id="${this.take_skins_cash}">0</span>
                            </div>
                        </div>

                        <div class="centr_block_game_intro">
                            <div class="centr_block_game_intro_text">
                                <p>Выбранно</p>
                                <span id="${this.take_skins_how}">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="left_menu_header_get_all">
                        <div class="left_menu_header_get_all_components">
                            <label class="switch_items">
                                <input id="inventory_checkbox" type="checkbox">
                                <span class="slider round"></span>
                            </label>
                            <span>Выбрать все</span>
                        </div>
                        
                    </div>
                    
                </div>

                <div class="left_block_body">
                    <div class="left_block_body_inventory">

                    </div>
                    <div class="left_block_body_add_button">
                        <span>Пополнить баланс</span>
                    </div>
                </div>
            `);

            this.inventory_block_not_auth = $(`
                <div class="inventory_block_not_autn">
                    <div class="inventory_block_not_autn_in">
                        <img src="./assets/css/images/unlock.png" alt="">
                        <span>Вам нужно войти<br>на сайт</span>
                        <p>Инвентарь недоступен</p>
                        <div class="user_steam">
                            <img src="./assets/css/images/header/steam.svg" alt="">
                            <span>Войти через Steam</span>
                        </div>
                    </div>
                    
                </div>
            `);

            this.get_items = $(`
                <div class="add_money">
                    <div class="add_money_in">
                        <div class="add_money_block">
                            <div class="add_money_block_img">
                                <img src="./assets/css/images/all/logo.png" alt="">
                            </div>
                            <div class="add_money_block_text">
                                <div class="add_money_block_text_in">
                                    <h1>Полполнить баланс</h1>
                                    <p>все доступные вещи для пополнения на сайте:</p>
            
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/steam.png" alt="">
                                        </div>
                                        <span>Вещи Steam</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/TF2.png" alt="">
                                        </div>
                                        <span>Team Fortress 2</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/Rust.jpg" alt="">
                                        </div>
                                        <span>Rust</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/pd2.png" alt="">
                                        </div>
                                        <span>Payday 2</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/Unturned.png" alt="">
                                        </div>
                                        <span>Unturned</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/Z1BR.png" alt="">
                                        </div>
                                        <span>Z1BR</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/depth.jpg" alt="">
                                        </div>
                                        <span>Depth</span>
                                    </div>
                                    <div class="add_money_box">
                                        <div class="add_money_box_img">
                                            <img src="./assets/css/images/logined_block/KF2.png" alt="">
                                        </div>
                                        <span>Killing Floor 2</span>
                                    </div>
            
            
                                    <div class="add_money_block_text_button">
                                        <span>Пополнить</span>
                                    </div>
            
                                    <div class="add_item_close_button">
                                        <span>+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        put_money(money) {
            $('#take_skins_cash').animate({ num: money }, {
                duration: 500,
                step: function (num){
                    if(global.put_items.length == 0) {
                        this.innerHTML = num.toFixed(0);
                    } else {
                        this.innerHTML = num.toFixed(2);
                    }
                }
            });

            $('#take_skins_how').html(global.put_items.length);
        }

        auth_render() {
            this.$component.find('.left_block_body_inventory').empty();
            page.user.inventory.forEach(element => {
                var inventory_block = $(`
                    <div class="inventory_block" data="${element._id}">
                        <a_s>${element.market_hash_name}</a_s>
                        <img src="${element.icon_url}" alt="">
                        <a_t>${element.price} $</a_t>
                    </div>
                `);
                this.$component.find('.left_block_body_inventory').append(inventory_block);
            });

            var _this = this;

            this.$component.find('.inventory_block').click( function() {
                if($('#inventory_checkbox').is(':checked')) {
                    return;
                }
                var _idItem = $(this).attr('data');
                var get_money = 0;
                global.put_items.forEach(el => {
                    let result = page.user.inventory.find(item => item._id == el);
                    get_money = get_money + parseFloat(result.price);
                });

                if(!$(this).hasClass('selected')) {
                    global.put_items.push(_idItem);
                    let result = page.user.inventory.find(item => item._id == _idItem);
                    get_money = get_money + parseFloat(result.price);
                } else {
                    global.put_items.splice(global.put_items.indexOf(_idItem), 1);
                    let result = page.user.inventory.find(item => item._id == _idItem);
                    get_money = get_money - parseFloat(result.price);
                }

                $(this).toggleClass('selected');

                _this.put_money(get_money);

            });

            this.$component.find('.left_block_body_add_button').click( function() {
                $('.add_money').fadeIn();
            });
        }

        take_all(data) {
            var get_money = 0;
            if(Auth) {
                if(data) {
                    global.put_items = new Array();
                    page.user.inventory.forEach(el => {
                        get_money = get_money + parseFloat(el.price);
                        global.put_items.push(el._id);
                    });
                    $('.inventory_block').addClass('selected');
                } else {
                    global.put_items = new Array();
                    $('.inventory_block').removeClass('selected');
                }
    
                this.put_money(get_money);
            }
        }

        async render() {
            if(Auth) {this.auth_render()}
            else
            {
                this.$component.find('.left_block_body_add_button').remove();
                this.$component.find('.left_block_body_inventory').css('height', 'calc(100% - 25px)');
                this.$component.find('.left_block_body_inventory').empty().append(this.inventory_block_not_auth);
                this.$component.find('.user_steam').click( function() {
                    location.href = './steam.php';
                });
            };
            this.get_items.find('.add_item_close_button').click( function() {
                $('.add_money').fadeOut();
            });
            this.get_items.find('.add_money_block_text_button').click( function() {
                window.open("https://steamcommunity.com/tradeoffer/new/?partner=1166998707&token=jf29zgZF", "_blank");
            });
            $('body').append(this.get_items);
            return this.$component;
        }

    }

    class Chat_Block {

        constructor() 
        {
            this.$component = $(`
                <div class="chat_block">
                    <div class="chat_header">
                        <span>Онлайн чат</span>
                    </div>

                    <div class="chat_body"></div>

                    <div class="chat_input">
                        <div class="chat_input_in">
                            <input type="text" id="chat">
                            <div class="go_msg">
                                <img src="./assets/css/images/telegram.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            `);

        }

        SocketMSG(data) {
            if(!data) data = {};
            return callApi({
                methodName: 'msg',
                data: data,
            }).then((response) => {
                return response;
            });
        }

        chat_block() {
            if(Auth) {
                if($('#chat').val().length > 0) {
                    global.PostComponents("msg",{
                        user: global.getCookie('token'),
                        data_id: global.global_data.data_id,
                        msg: $('#chat').val(),
                    });
                    $('#chat').val('');
                }
            }
        }

        go_msg() {
            var _this = this;
            this.$component.find('.go_msg').click( function() {
                _this.chat_block();
            });
        }

        take_msg(data) {

            var ver = $(`
                <div class="verification_block">
                    <img src="./assets/css/images/all/check.svg" alt=""></img>
                </div>
            `);

            var msg_block = $(`
                <div class="chat_body_msg">
                    <div class="chat_msg_img">
                        <div class="chat_msg_img_in">
                            <img src="" alt="">
                        </div>
                    </div>
                    <div class="chat_msg_text_block">
                        <div class="verify"><p></p></div>
                        <div class="chat_msg_text_block_in">
                            <span></span>
                        </div>
                    </div>
                </div>
            `);

            msg_block.find('.chat_msg_img img').attr('src', data.img);
            msg_block.find('.chat_msg_text_block p').append(data.name);
            msg_block.find('.chat_msg_text_block span').append(data.msg);

            if(page.user.verification) {
                msg_block.find('.verify p').append(ver);
            }
            return msg_block;
        }

        render() {
            this.go_msg();
            return this.$component;
        }

    }

    class Spinner_Game {

        constructor() {

            this.myVinyls = {
                "green": 10,
                "purple": 14,
                "yellow": 2,
                "blue": 12
            };

            this.$component = $(`
                <div class="centr_block_in">

                </div>
            `);

            this.upperCentrLine = $(`
                <div class="centr_block_upper_line">
                    <div class="centr_block_upper_line_line"></div>
                </div>
            `);

            this.upperCentr = $(`
                <div class="centr_block_players_game">

                </div>
            `);

            this.gameBLock = $(`
                <div class="centr_block_game">
                    <div id="game_block">
                        <canvas id="game"></canvas>
                    </div>
                    <div class="game_block_text">
                        <span id="blink">ОЖИДАНИЕ<br><g_v>ВТОРОГО ИГРОКА</g_V></span>
                    </div>
                </div>
            `);

            this.bottomGameBlock = $(`
                <div class="centr_block_game_bottom">
                    <div class="centr_block_game_bottom_info">
                        <div class="centr_block_game_intro">
                            <div class="centr_block_game_intro_in">
                                <img src="./assets/css/images/number_game.svg" alt="">
                                <div class="centr_block_game_intro_text">
                                    <p>НОМЕР ИГРЫ</p>
                                    <span id="spinner_id_game">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="centr_block_game_intro">
                            <div class="centr_block_game_intro_in">
                                <img src="./assets/css/images/players.svg" alt="">
                                <div class="centr_block_game_intro_text">
                                    <p>УЧАСТНИКОВ</p>
                                    <span id="spinner_all_users_play">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="centr_block_game_intro">
                            <div class="centr_block_game_intro_in">
                                <img src="./assets/css/images/money.svg" alt="">
                                <div class="centr_block_game_intro_text">
                                    <p>ОБЩАЯ СУММА</p>
                                    <span id="spinner_summ">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ctl_in"></div>
                    <div class="centr_block_game_bottom_button">
                        <span>Начать</span>
                    </div>
                </div>
            `);

            this.itemsBlock = $(`
                <div class="centr_block_items">
                    <div class="centr_block_items_in">

                    </div>
                </div>
            `);

            this.preloader = $(`
                <div class="preloader_items">
                    <div class="preloader_items_in">
                        <img src="./assets/css/images/spinner_game/preloader.svg" alt="">
                        <span>ожидание</span>
                    </div>
                </div>
            `);

            this.item_bottom_block = $(`
                <div class="item_block">

                </div>
            `);
        }   

        render() {
            this.$component.append(this.upperCentrLine);
            this.$component.append(this.upperCentr);
            this.$component.append(this.gameBLock);
            this.$component.append(this.bottomGameBlock);
            this.$component.append(this.itemsBlock);
            this.$component.find('.centr_block_items_in').empty().append(this.preloader);
            return this.$component;
        }



        render_orbs() {
            var SpnnerDataColors = {};

            if(game.players.length == 0) {
                default_spinner(document.getElementById("game"), myVinyls, myColors);
                return;
            }

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
            
            if(free_data.length > 0) {
                SpnnerDataColors.blue = free_data[0].deg;
            }
            if(free_data.length > 1) {
                SpnnerDataColors.yellow = free_data[1].deg;
            }
            if(free_data.length > 2) {
                SpnnerDataColors.red = free_data[2].deg;
            }
            if(free_data.length > 3) {
                SpnnerDataColors.green = free_data[3].deg;
            }
            if(free_data.length > 4) {
                SpnnerDataColors.purple = free_data[4].deg;
            }

            default_spinner(document.getElementById("game"), SpnnerDataColors, myColors);
        }

        reload_bootm_info() {
            $('#spinner_all_users_play').animate({ num: 0 }, {
                duration: 500,
                step: function (num) {
                    this.innerHTML = num.toFixed(0);
                }
            });
            $('#spinner_summ').animate({ num: 0 }, {
                duration: 500,
                step: function (num) {
                    this.innerHTML = num.toFixed(0);
                }
            });
        }

        render_again() {
            $('.centr_block_players_game').empty();
            $('.centr_block_items_in').empty().append(this.preloader);
            $('.preloader_items').fadeIn();
            $('#blink').html('ОЖИДАНИЕ');
            this.render_orbs();
            this.reload_bootm_info();
        }

        start_post(data) {
            if(!data) return;
            return callApi({
                methodName: 'start_game',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

        get_data(data) {
            if(!data) data = {};
            return callApi({
                methodName: 'data_game',
                data: data,
            }).then((data) => {
                return data; 
            });
        }

        // ========================================================================================

        start_animation(data) {
            $('.centr_block_players_game').empty();
            var block = `
                <div class="centr_block_players_game_arrow">
                    <span></span>
                </div>
                <div class="centr_block_players_game_in">   
                    <div class="centr_block_players_game_in_block">
                        
                    </div>
                </div>
            `;
            $('.centr_block_players_game').append(block);
            data.users.forEach(element => {
                var user = game.players.find(item => item.userId == element);
                var items_bottom = `
                    <div class="players_game_img" style="border: 1px solid ${myColors[game.players.indexOf(user)]}; margin-left: 5px; height: 43px;">
                        <img src="${user.user.img}" alt="">
                    </div>
                `;
                $('.centr_block_players_game_in_block').append(items_bottom);
            });

            var need_left_scroll = (52*data.winner) - ($('.centr_block_players_game').width() / 2) - 26.5;

            $('.centr_block_players_game_in').fadeIn( function() {
                $('.centr_block_players_game_in_block').animate({
                    "left": "-" + need_left_scroll + "px",
                });
            });

            setTimeout( function() {
                if(data.winner_id == page.user.userId) {
                    MyAlert('Ты выиграл!');
                }
            }, 5000);
            
        }


        render_add_player() 
        {
            this.add_upper_players_again();
            this.rendom_bottom_add_item_again();
            this.render_bottom_info();
            this.render_orbs();
        }


        // reload page ==================================================================

        add_upper_players_again() { // upper block again
            $('.centr_block_players_game').empty();
            game.players.forEach((element, i) => {
                var items_bottom = `
                    <div class="players_game_img" style="border-color: ${myColors[i]}">
                        <img src="${element.user.img}" alt="">
                    </div>
                `;
                $('.centr_block_players_game').append(items_bottom);
            });
        }

        render_bottom_info() // info botom block again
        {
            var all_money   = 0;
            var all_players = game.players.length;
            var number_game = game._id;
            game.players.forEach(element => {
                element.items.forEach(item => {
                    all_money = all_money + parseFloat(item.price);
                });
            });
            $('#spinner_summ').animate({ num: all_money }, {
                duration: 500,
                step: function (num){
                    this.innerHTML = num.toFixed(2);
                }
            });
            $('#spinner_all_users_play').html(all_players);
            $('#spinner_id_game').html(number_game + 1);
        }

        rendom_bottom_add_item_again() // bottom box again
        {
            $('.centr_block_items_in').empty();
            game.players.forEach(element => {
                element.items.forEach(item => {
                    var items_bottom = `
                        <div class="item_block">
                            <div class="item_block_item">
                                <div class="item_block_item_img">
                                    <img src="${item.icon_url}" alt="">
                                </div>
                                <span>${item.market_hash_name}</span>
                                <a>${item.price}</a>
                            </div>
                            <div class="item_block_user">
                                <span>${element.user.name}</span>
                                <div class="item_block_user_img">
                                    <img src="${element.user.img}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    $('.centr_block_items_in').append(items_bottom);
                });
            });
        }

        render_start_true() // status: true again
        {
            $('.preloader_items').fadeOut('fast');
            this.rendom_bottom_add_item_again();
            this.render_bottom_info();
            this.add_upper_players_again();
            this.render_orbs();
        }

        // =========================================================================


        async start() // start button
        {
            if(put_items.length <= 0) {MyAlert('Вы ничего не выбрали!'); return};
            var put_items_add = new Array();
            put_items.forEach(element => {
                page.user.inventory.forEach(el => {
                    if(el._id == element) {
                        put_items_add.push(el);
                    }
                })
            })
            var start_data = 
            {
                token: global.getCookie('token'),
                user: page.user,
                items: put_items_add,
            }
            var get_start_content = await this.start_post(start_data);
            if(get_start_content.status) {
                MyAlert("Cтавка принята!");
                $('.inventory_block').removeClass('selected');
                put_items.forEach(element => {
                    $('.inventory_block[data="'+ element +'"]').fadeOut('fast', function() {
                        $(this).remove();
                    });
                });
                global.put_items = new Array();
            } else {
                MyAlert(get_start_content.error);
            }
        }

    }

    class Cabinet {
        constructor() {
            this.profil = $(`
                <div class="profil">
                    <h1>Мои данные</h1>
                    <div class="profil_img_block">
                        <div class="profil_img"></div>
                    </div>
                    <div class="profil_text_block">
                        <div class="profil_text">
                            <div class="profil_text_div">
                                <p>Имя: <span>oPEJI</span></p>
                            </div>
                            <div class="profil_text_div">
                                <p>Steam ID: <span>1242356347</span></p>
                            </div>
                            <div class="profil_text_div">
                                <p>Игр сыграно: <span>12</span></p>
                            </div>
                            <div class="profil_text_div">
                                <p>Выигранных игр: <span>12%</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            this.trade_url = $(`
                <div class="profil_url">
                    <input type="text" id="profil_url_input"> <span><img src="./assets/css/images/telegram.svg" alt=""></span>
                </div>
            `);

            this.inventory = $(`
                <div class="profil_inventory">
                    <div class="profil_inventory_header">
                        <a>Инвентарь</a>
                        <div class="profil_inventory_header_buttons">
                            <div class="profil_inventory_add">
                                <span>полпонить</span>
                            </div>
                            <div class="profil_inventory_out">
                                <span>вывод</span>
                            </div>
                        </div>
                    </div>
                    <div class="profil_inventory_body">

                    </div>
                </div>
            `);
        }

        add_inventory() {
            $('.profil_inventory').find('.profil_inventory_body').empty();
            page.user.inventory.forEach(element => {
                var inventory_block = `
                    <div class="profil_inventory_block" data="${element._id}">
                        <a_s>${element.market_hash_name}</a_s>
                        <img src="${element.icon_url}" alt="">
                        <a_t>${element.price} $</a_t>
                    </div>
                `;
                $('.profil_inventory').find('.profil_inventory_body').append(inventory_block);
            });

            $('.profil_inventory').find('.profil_inventory_block').click( function() {
                var _idItem = $(this).attr('data');
                if(!$(this).hasClass('selected')) {
                    global.put_global_items.push(_idItem);
                } else {
                    global.put_global_items.splice(global.put_items.indexOf(_idItem), 1);
                }
                $(this).toggleClass('selected');
            });
        }

        async render() {
            this.profil.find('.profil_img').append(`<img src="${page.user.avatarfull}" alt=""></img>`);
            $('.cabinet_profil').empty().append(this.profil);
            $('.cabinet_body_in').empty();
            $('.cabinet_body_in').append(this.trade_url);
            $('.cabinet_body_in').append(this.inventory);
            $('.profil_inventory_add').click( function() {
                $('.add_money').fadeIn();
            })
        }

        start() {
            this.add_inventory();
            $('.cabinet').fadeToggle();
        }
    }

    if(!global.Components)
    {
        global.Components = {
            Get_All_Data,
            Header_Block,
            Inventory_Block,
            Chat_Block,
            Spinner_Game,
            Cabinet,
        }
    }
    


}(window))