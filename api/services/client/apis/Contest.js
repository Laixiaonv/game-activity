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
    })("Contest", function (Parent) {
        function Contest(arg) {
            if (!(this instanceof Contest)) {
                return new Contest(arg);
            }

            this._userId = arg.userId;
            this._token = arg.token;
        }

        Contest.prototype = Object.create(Parent.prototype);

        Contest.prototype.funcTags = {
            GET_MATCH_APPLY: 20020080,
            SAVE_MATCH_APPLY: 20020079,
            GET_LSL_PUBLIC_INFO: 20020081,
            GET_ALBUM_LIST: 20100001,
            GET_ALBUM_DETAIL: 20100002,
            VOTE_BY_VALIDUSER: 30010001,
            GET_VOTE_PAGE_INFO_BY_VOTEID: 30010002,
            GET_CANDIDATES_INFO_BY_VOTE_NUM: 30010003,
            GET_CANDIDATES_INFO_IN_ORDER: 30010004
        };

        /**
         * 查询报名信息
         * @see http://10.0.0.55/mediawiki/index.php/GameApplyFunction.getMatchApply
         */
        Contest.prototype.getMatchApply = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_MATCH_APPLY;
            if (this._userId) {
                parameter.userId = this._userId;
            }
            if (this._token) {
                parameter.token = this._token;
            }
            return this.request(parameter, cb);
        };

        /**
         * 提交报名信息
         * @see http://10.0.0.55/mediawiki/index.php/GameApplyFunction.saveMatchApply
         */
        Contest.prototype.saveMatchApply = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.SAVE_MATCH_APPLY;
            if (this._userId) {
                parameter.userId = this._userId;
            }
            if (this._token) {
                parameter.token = this._token;
            }
            return this.request(parameter, cb);
        };

        /**
         * 合作推广信息查询
         * @see http://10.0.0.55/mediawiki/index.php/PromotePartnerFunction.getValiablePartnerPromotes
         */
        Contest.prototype.getPublicInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_LSL_PUBLIC_INFO;
            parameter._cache = this.CACHE_CATALOG.M1440;

            return this.request(parameter, cb);
        };

        /**
         * 获取相册列表
         * @see http://10.0.0.55/mediawiki/index.php/PictureAlbumFunction.getAlbumList
         */
        Contest.prototype.getAlbumList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ALBUM_LIST;
            parameter._cache = this.CACHE_CATALOG.M3;

            return this.request(parameter, cb);
        };

        /**
         * 获取相册详情
         * @see http://10.0.0.55/mediawiki/index.php/PictureAlbumFunction.getAlbumDetail
         */
        Contest.prototype.getAlbumDetail = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ALBUM_DETAIL;
            parameter._cache = this.CACHE_CATALOG.M3;

            return this.request(parameter, cb);
        };

        /**
         * voteByValidUser
         * @see http://10.0.0.55/mediawiki/index.php/VoteFunction.voteByValidUser
         */
        Contest.prototype.voteByValidUser = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.VOTE_BY_VALIDUSER;

            return this.request(parameter, cb);
        };

        /**
         * getVotePageInfoByVoteId
         * @see http://10.0.0.55/mediawiki/index.php/VoteFunction.getVotePageInfoByVoteId
         */
        Contest.prototype.getVotePageInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_VOTE_PAGE_INFO_BY_VOTEID;

            return this.request(parameter, cb);
        };

        /**
         * getCandidatesInfoByVotesNum
         * @see http://10.0.0.55/mediawiki/index.php/VoteFunction.getCandidatesInfoByVotesNum
         */
        Contest.prototype.getCandidatesInfoByVotesNum = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_CANDIDATES_INFO_BY_VOTE_NUM;

            return this.request(parameter, cb);
        };

        /**
         * getCandidatesInfoInOrder
         * @see http://10.0.0.55/mediawiki/index.php/VoteFunction.getCandidatesInfoInOrder
         */
        Contest.prototype.getCandidatesInfoInOrder = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_CANDIDATES_INFO_IN_ORDER;

            return this.request(parameter, cb);
        };

        return Contest;
    });
})();