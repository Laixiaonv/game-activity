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
    })("Video", function (Parent) {
        function Video(arg) {
            if (!(this instanceof Video)) {
                return new Video(arg);
            }
        }

        Video.prototype = Object.create(Parent.prototype);

        Video.prototype.funcTags = {
            VIDEO_GET_UPLOAD_TOKEN: 10002050,
            VIDEO_SAVE_GAME_VIDEO: 20030002,
            VIDEO_GET_GAME_VIDEO_LIST: 20030001,
            VIDEO_DEL_USER_NEWS_FOLDER: 10002055,
            VIDEO_GET_GAME_VIDEO_INFO: 20030003,
            VIDEO_SAVE_VIDEO_BARRAGE: 20020065,
            VIDEO_GET_VIDEO_BARRAGE: 20020066
        };

        /**
         * get upload token
         * @see http://10.0.0.55/mediawiki/index.php/UserShareFunction.getUploadToken
         */
        Video.prototype.getUploadToken = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.VIDEO_GET_UPLOAD_TOKEN;
            parameter.resumeUp = 1;
            parameter.mimeType = 1;
            parameter.resType = 1;
            parameter.newsType = 11;
            parameter.resType = 1;
            parameter.vframeSeconds = 1;
            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * save upload video
         * @see http://10.0.0.55/mediawiki/index.php/GameVideoAction.saveGameVideo
         */
        Video.prototype.saveGameVideo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.VIDEO_SAVE_GAME_VIDEO;

            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * my video
         * @see http://10.0.0.55/mediawiki/index.php/GameVideoAction.getGameVideoList
         */
        Video.prototype.getGameVideoList = function (userId, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.VIDEO_GET_GAME_VIDEO_LIST;
            parameter.pageIndex = typeof args.parameter === "object" ? args.parameter.pageIndex : 1;
            parameter.resType = typeof args.parameter === "object" ? args.parameter.resType : 1;
            parameter.sortType = typeof args.parameter === "object" ? args.parameter.sortType : 1;
            parameter.countPerPage = typeof args.parameter === "object" ? args.parameter.countPerPage : 1;

            parameter.userId = typeof args.parameter === "object" ? args.parameter.userId : args.parameter;
            parameter.userId = parameter.userId || 1;
            var token = typeof args.parameter === "object" ? args.parameter.token : '';
            if (token != '') {
                parameter.token = token;
            }

            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * delete my video
         * @see:http://10.0.0.55/mediawiki/index.php/UserShareFunction.delUserNewsFolder
         */
        Video.prototype.delUserNewsFolder = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.VIDEO_DEL_USER_NEWS_FOLDER;

            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * get video info by id
         * @see http://10.0.0.55/mediawiki/index.php/GameVideoAction.getGameVideoInfoById
         */
        Video.prototype.getGameVideoInfoById = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.VIDEO_GET_GAME_VIDEO_INFO;

            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * dave barrage
         * @see http://10.0.0.55/mediawiki/index.php/GameApiAction.saveVideoBarrage
         */
        Video.prototype.saveVideoBarrage = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.VIDEO_SAVE_VIDEO_BARRAGE;

            var ret = this.request(parameter, cb);
            return ret;
        };

        /**
         * get barrage
         * @see http://10.0.0.55/mediawiki/index.php/GameApiAction.getVideoBarrage
         */
        Video.prototype.getVideoBarrage = function (newsId, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.VIDEO_GET_VIDEO_BARRAGE;
            parameter.videoId = newsId;

            var ret = this.request(parameter, cb);
            return ret;
        };

        return Video;
    });
})();
