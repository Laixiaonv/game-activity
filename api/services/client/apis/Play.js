(function () {
    !(function (name, definition) {
        // Check exports
        var hasExports = typeof module !== 'undefined' && module.exports;
        if (hasExports) {
            module.exports = definition;
        } else {
            // Assign to common namespaces or simply the global object (window)
            this.apis = this.apis || {};
            this.apis[name] = definition;
        }
    })("Play", function (Parent) {
        function Play(arg) {
            if (!(this instanceof Play)) {
                return new Play(arg);
            }
            if(arg) {
                this._userId = arg.userId;
                this._token = arg.token;
            }
        }

        Play.prototype = Object.create(Parent.prototype);

        Play.prototype.funcTags = {
            GET_ACTOR_AND_USER_TOP_LIST:88008800, /*排行榜*/
            ACTOR_SORT_BY_HEADLINES:10002043, /*上头条礼物排行榜*/
            TIME_BY_HEADLINES:10002047, /*上头条新榜单*/
            USER_RECEIVE_GIFT:88008900,
            QUERY_MY_SELF_COUNT:88008901,
            CEREMONY_CHECK_CAR_INFO:88009000,
            READ_ACTIVITY_INFO:88009001,
            LUCKYID_TO_USERID:10005047,/*还原靓号*/
            GET_USER_INFO:10005001,/*获取用户信息*/
            //首充用户领取礼包
            RECEIVE_USER_FIRST_RECHARGE_PACKAGE : 20010012,
            GET_USER_FIRST_RECHARGE_PACKAGE_INFO : 20010013,

            GET_SHARE_RECOMMENDED_MSG: 51010801,/*获取分享信息 meShow接口*/

            //金币商城/*meShow接口*/
            GET_USER_GOLD_COIN: 51030106,
            GET_COIN_PROP_LIST: 51030108,
            EXCHANGE_COIN_PROP: 51030109,
            IS_CHARGE_LOTTERY_DRAW: 51010306,
            DO_LOTTERY: 51010304,
            GET_LOTTERY_PRIZE_LIST: 51010307,

            //谁是百万富翁/*定制接口*/
            GET_QUIZ_RANKING_LIST: 51050403,
            GET_USER_QUIZ_AMOUNT: 51050406,
            GET_USER_OBTAIN_LIVECARD:51050412,

            //新用户七日狂欢/*kkgame接口*/
            GET_USER_TASK_INFO: 88009100,
            GET_TASK_GAIN: 88009101,
            GET_HALF_PRICE_GIFT: 88009102,
            GET_TASK_BOX: 88009103,

            //汉今国际产品在线购买/*meShow接口*/
            GET_PRODUCTS: 51060511,

            //我的星光梦
            CHECK_DREAM_SIGN_UP: 88008819,
            UPLOAD_GREAM_SIGN_UP: 88008820,
            GET_GREAM_LIST: 88008821,
            VOTE_FOR_GREAM_ANCHOR: 88008822,
            DRAW_DREAM_ACTIVITY: 88008823,

            //四周年
            GET_FANS_LIST_FOR_ACTOR: 10003013,

            //周星榜单
            GET_WEEK_GIFT_RANK: 10002073,/*meShow接口*/

            //颜值监测站
            GET_FACE_SCORE_CONTRAST: 86000030,

            //兑吧合作页-新用户注册领取VIP
            SEND_SMS_FOR_NEW_USER : 10001022,
            CHECK_SMS_FOR_NEW_USER : 10001031,/*meShow接口*/
            GET_PRESENT_FOR_DUIBA_USER : 50001001,/*meShow接口*/

            // 年度盛典晋级赛房间内展示
            CEREMONY_JINJISAI: 88009000,
            GET_SUBCATA_ROOM_LIST: 20010302, /*获取主播模块*/
            GET_HOT_ROOM_LSIT:55000003, /*综合排序*/
            GET_ROOM_LIST:60001002,
            GET_LIVE_ROOM_BY_CATAID: 20010309,

            //KK战神
            GET_RICH_LIST: 86000032, /*战神列表*/
            QUERY_RICH_COUNT: 86000033, /*被膜拜次数*/
            CULT_RICH_USER: 86000034, /*膜拜*/
            QUERY_OWN_COUNT: 86000035, /*我的膜拜信息*/

            GET_USER_SHARE_REWARD_LIST: 20010019,
            GET_ACTOR_PROMOTION_REWARD_LIST: 20010020,

            //兑换券

            GET_VOUCHER_SEND:86000091,/*用户转赠奖券*/
            GET_VOUCHER_CHANGE: 86000093,/*用户兑换票券*/
            GET_VOUCHE_INFO: 86000094,/*用户获取拥有票券*/


            //关注列表

            GRT_FOCUS_LIST:10003003 ,/*meShow接口*/


            //世界杯竞猜（统一meShow接口）
            TWC_QUIZ_HISTORY:51050601,/*用户竞猜历史*/
            TWC_QUIZ_USERINFO:51050602,/*用户竞猜信息*/
            TWC_RANK_LIST:51050603,/*获取竞猜榜单*/
            TWC_QUIZ_DATE:51050604,/*时间列表*/
            TWC_QUIZ_INFO:51050605,/*竞猜详情列表*/
            TWC_QUIZ_BET:51050606,/*用户竞猜下注*/
            TWC_APPLY_DELIVERY:51050607,/*用户申请发货*/
            TWC_DELIVERY_INFO:51050608,/*获取发货信息*/
            TWC_ROOM_INFO:51050609,/*纪念币购买专区*/
            TWC_COIN_TASK:51050610,/*查看获取竞猜币任务列表*/
            SET_ADDRESS_INFO:51010102,/*设置用户收货地址信息*/
            GET_ADDRESS_INFO:51010103,/*获取用户收货地址信息*/
            TWC_ROOM_COLUMN:10002032/*世界杯栏目id*/

        };

        Play.prototype.getShareRecommendedMsg = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_SHARE_RECOMMENDED_MSG;

            return this.request(parameter, cb);
        };

        Play.prototype.getActorAndUserTopList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_ACTOR_AND_USER_TOP_LIST;
            parameter.start =  parameter.start || 0;
            parameter.offset =  parameter.offset || 0;

            return this.request(parameter, cb);
        };

        Play.prototype.actorSortByHeadlines = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.ACTOR_SORT_BY_HEADLINES;

            return this.request(parameter, cb);
        };

        Play.prototype.timeByHeadlines = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TIME_BY_HEADLINES;

            return this.request(parameter, cb);
        };

        Play.prototype.receiveUserGift = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.USER_RECEIVE_GIFT;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        Play.prototype.queryMySelfRank = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.QUERY_MY_SELF_COUNT;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        Play.prototype.getCeremonyCarInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CEREMONY_CHECK_CAR_INFO;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.type = parameter.type || 1;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        Play.prototype.getCeremonyCar = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CEREMONY_CHECK_CAR_INFO;
            this._userId && 100000 !== this._userId && (parameter.userId = parameter.userId || this._userId);
            this._token && 'unknow' !== this._token && (parameter.token = parameter.token || this._token);
            parameter.type = parameter.type || 2;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        Play.prototype.readActivityInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.READ_ACTIVITY_INFO;
            this._userId && 100000 !== this._userId && (parameter.userId = parameter.userId || this._userId);
            this._token && 'unknow' !== this._token && (parameter.token = parameter.token || this._token);
            parameter.type = parameter.type || 1;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        Play.prototype.luckyIdToUserId = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.LUCKYID_TO_USERID;
            parameter.luckyId = parameter.luckyId || this._userId;

            return this.request(parameter, cb);
        };

        Play.prototype.getUserInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_INFO;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };

        //首充用户领取礼包
        Play.prototype.receiveUserFirstRecharPackage = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.RECEIVE_USER_FIRST_RECHARGE_PACKAGE;
            parameter.userId = this._userId;

            return this.request(parameter, cb);
        };
        //首充用户查询礼包
        Play.prototype.getUserFirstRechargePackageInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_FIRST_RECHARGE_PACKAGE_INFO;
            parameter.userId = this._userId;

            return this.request(parameter, cb);
        };

        //金币商城-我的金币
        Play.prototype.getUserGoldCoin = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_GOLD_COIN;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //金币商城-礼物列表
        Play.prototype.getCoinPropList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_COIN_PROP_LIST;
            parameter.pageIndex = parameter.pageIndex || 1;
            parameter.countPerPage = parameter.countPerPage || 10;

            return this.request(parameter, cb);
        };
        //金币商城-兑换礼物
        Play.prototype.exchangeCoinProp = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.EXCHANGE_COIN_PROP;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //金币商城-抽奖机会
        Play.prototype.isChargeLotteryDraw = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.IS_CHARGE_LOTTERY_DRAW;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //金币商城-抽奖
        Play.prototype.doLottery = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.DO_LOTTERY;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //金币商城-中奖信息
        Play.prototype.getLotteryPrizeList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_LOTTERY_PRIZE_LIST;

            return this.request(parameter, cb);
        };

        //谁是百万富翁-榜单
        Play.prototype.getQuizRankingList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_QUIZ_RANKING_LIST;

            return this.request(parameter, cb);
        };
        //谁是百万富翁-个人信息
        Play.prototype.getUserQuizAmount = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_QUIZ_AMOUNT;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //谁是百万富翁-是否通过观看直播获得复活卡
        Play.prototype.getUserObtainCard = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_OBTAIN_LIVECARD;
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };


        //新用户七日狂欢-用户任务数据
        Play.prototype.getUserTaskInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_USER_TASK_INFO;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //新用户七日狂欢-领取完成任务奖励
        Play.prototype.getTaskGain = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_TASK_GAIN;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //新用户七日狂欢-消费秀币获取半价礼物
        Play.prototype.getHalfPriceGift = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_HALF_PRICE_GIFT;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        //新用户七日狂欢-领取宝箱
        Play.prototype.getTaskBox = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_TASK_BOX;
            parameter.userId = parameter.userId || this._userId;
            parameter.token = parameter.token || this._token;

            return this.request(parameter, cb);
        };
        
        //汉今国际在线购买
        Play.prototype.getProducts = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_PRODUCTS;
            parameter.start = parameter.start || 0;
            parameter.num = parameter.num || 10;

            return this.request(parameter, cb);
        };

        //我的星光梦-检测是否报名过
        Play.prototype.checkDreamSignUp = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CHECK_DREAM_SIGN_UP;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.a = 2;

            return this.request(parameter, cb);
        };
        //我的星光梦-上传报名表
        Play.prototype.uploadGreamSignUp = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.UPLOAD_GREAM_SIGN_UP;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.a = 2;

            return this.request(parameter, cb);
        };
        //我的星光梦-主播列表(全局)
        Play.prototype.getGreamList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_GREAM_LIST;
            parameter.page = parameter.page || 1;
            parameter.a = 2;

            return this.request(parameter, cb);
        };
        //我的星光梦-主播列表(搜索)
        Play.prototype.searchGreamAnchor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_GREAM_LIST;
            parameter.page = 1;
            parameter.a = 2;

            return this.request(parameter, cb);
        };
        //我的星光梦-用户投票
        Play.prototype.voteForGreamAnchor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.VOTE_FOR_GREAM_ANCHOR;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.a = 2;

            return this.request(parameter, cb);
        };
        //我的星光梦-抽奖
        Play.prototype.drawDreamActivity = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.DRAW_DREAM_ACTIVITY;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };
        // 年度盛典晋级赛房间内展示
        Play.prototype.ceremonyJinjisai = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CEREMONY_JINJISAI;
            parameter.roomId = parameter.roomId;
            parameter.familyId = parameter.familyId;
            parameter.type = parameter.type || 4;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };
        //四周年成长值获取及兑换
        Play.prototype.getOrExchangeGrowth = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CEREMONY_JINJISAI;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };
        //四周年历程
        Play.prototype.getMyCourse = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.CEREMONY_JINJISAI;

            return this.request(parameter, cb);
        };
        //四周年最支持主播的土豪
        Play.prototype.getFansListForActor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_FANS_LIST_FOR_ACTOR;
            parameter.platform = 1;
            parameter.slotType = 3;

            return this.request(parameter, cb);
        };

        //颜值监测站
        Play.prototype.getFaceScoreContrast = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_FACE_SCORE_CONTRAST;
            parameter.platform = 1;

            return this.request(parameter, cb);
        };

        //周星榜单
        Play.prototype.getWeekGiftRank = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_WEEK_GIFT_RANK;
            parameter.platform = 1;

            return this.request(parameter, cb);
        };

        Play.prototype.getSubList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_SUBCATA_ROOM_LIST;
            parameter.start = parameter.start || 0;
            parameter.offset = parameter.offset || 10;

            return this.request(parameter, cb);
        };

        Play.prototype.getHotRoomList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_HOT_ROOM_LSIT;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        Play.prototype.getRoomList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ROOM_LIST;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 1;

            return this.request(parameter, cb);
        };

        Play.prototype.getLiveRoom = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;

            parameter.FuncTag = this.funcTags.GET_LIVE_ROOM_BY_CATAID;
            return this.request(parameter, cb);
        };

        //KK战神
        Play.prototype.getRichList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_RICH_LIST;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 1;

            return this.request(parameter, cb);
        };

        Play.prototype.queryRichCount = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.QUERY_RICH_COUNT;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 1;

            return this.request(parameter, cb);
        };

        Play.prototype.cultRichUser = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.CULT_RICH_USER;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 1;

            return this.request(parameter, cb);
        };

        Play.prototype.queryOwnCount = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.QUERY_OWN_COUNT;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.platform = parameter.platform || 1;
            parameter.a = parameter.a || 1;

            return this.request(parameter, cb);
        };

        //兑吧合作页-新用户注册领取VIP:发送验证码 变量phoneNum
        Play.prototype.sendSmsForNewUser = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.SEND_SMS_FOR_NEW_USER;
            parameter.platform = parameter.platform || 1;
            parameter.smsType = 8;

            return this.request(parameter, cb);
        };
        //兑吧合作页-新用户注册领取VIP:验证验证码 变量phoneNum, verifyCode
        Play.prototype.checkSmsForNewUser = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.CHECK_SMS_FOR_NEW_USER;
            parameter.platform = parameter.platform || 1;
            parameter.channel = 60166;
            parameter.refRoomId = 6055560;

            return this.request(parameter, cb);
        };
        //兑吧合作页-新用户注册领取VIP:领取VIP 变量userId, phoneNum
        Play.prototype.getPresentForDuibaUser = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_PRESENT_FOR_DUIBA_USER;
            parameter.c = 60166;
            parameter.refRoomId = 6055560;

            return this.request(parameter, cb);
        };

        Play.prototype.getUserShareReward = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_USER_SHARE_REWARD_LIST;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.start = parameter.start || 1;
            parameter.end = parameter.end || 10;

            return this.request(parameter, cb);
        };

        Play.prototype.getActorPromotionRewardList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ACTOR_PROMOTION_REWARD_LIST;
            parameter.userId = this._userId;
            parameter.token = this._token;
            parameter.start = parameter.start || 1;
            parameter.end = parameter.end || 10;

            return this.request(parameter, cb);
        };


        //用户转赠折扣券
        Play.prototype.getSendVoucher = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_VOUCHER_SEND;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };
        //用户兑换折扣券
        Play.prototype.getChangeVoucher = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_VOUCHER_CHANGE;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };
        //用户获取拥有票券信息
        Play.prototype.getVoucherInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_VOUCHE_INFO;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        //关注列表
        Play.prototype.getFocusList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GRT_FOCUS_LIST;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };


        /*********************世界杯竞猜*************************/

        //用户基本信息
        Play.prototype.quizUserInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_USERINFO;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };

        //时间列表
        Play.prototype.quizDateList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_DATE;

            return this.request(parameter, cb);
        };
        //竞猜列表
        Play.prototype.quizInfoList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_INFO;
            this._userId && 100000 !== this._userId && (parameter.userId = parameter.userId || this._userId);
            this._token && 'unknow' !== this._token && (parameter.token = parameter.token || this._token);

            return this.request(parameter, cb);
        };
        //	获取世界杯相关直播间
        Play.prototype.quizRoomInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_ROOM_INFO;

            return this.request(parameter, cb);
        };
        //查看获取竞猜币任务列表
        Play.prototype.quizCoinTask = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_COIN_TASK;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;
            return this.request(parameter, cb);
        };
        //获取竞猜榜单
        Play.prototype.quizRankList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_RANK_LIST;

            return this.request(parameter, cb);
        };
        //用户竞猜下注
        Play.prototype.quizBet = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_BET;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //用户竞猜下注历史
        Play.prototype.quizBetHistory = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_HISTORY;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //用户竞猜历史
        Play.prototype.quizHistoryInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_QUIZ_HISTORY;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //用户申请发货
        Play.prototype.quizApplyDelivery = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_APPLY_DELIVERY;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //获取发货信息
        Play.prototype.quizDeliveryInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_DELIVERY_INFO;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //设置用户收货地址信息
        Play.prototype.setAddressInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.SET_ADDRESS_INFO;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //获取用户收货地址信息
        Play.prototype.getAddressInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_ADDRESS_INFO;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        //世界杯栏目id
        Play.prototype.roomColumn = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.TWC_ROOM_COLUMN;
            parameter.userId || (parameter.token = this._token);
            parameter.userId = parameter.userId || this._userId;

            return this.request(parameter, cb);
        };
        /********************************************************/



       return Play;
    });
})();
