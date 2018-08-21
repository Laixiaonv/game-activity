(function() {
    !(function(name, definition) {
        // Check exports
        var hasExports = typeof module !== 'undefined' && module.exports;
        if (hasExports) {
            module.exports = definition;
        } else {
            // Assign to common namespaces or simply the global object (window)
            this.apis = this.apis || {};
            this.apis[name] = definition;
        }
    })("Apply", function(Parent) {
        function Apply(arg) {
            if (!(this instanceof Apply)) {
                return new Apply(arg);
            }

            this._userId = arg.userId;
            this._token = arg.token;
        }

        Apply.prototype = Object.create(Parent.prototype);

        Apply.prototype.funcTags = {
            GET_APPLY_INFO : 10006058,
            APPLY_ACTOR : 10006059,
            RE_APPLY_ACTOR:20010503
        };
        /**
         * get apply info
         * @see http://10.0.0.55/mediawiki/index.php/OtherFunctions.getApplyForActorInfo
         */
        Apply.prototype.getApplyInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;

            parameter.FuncTag = this.funcTags.GET_APPLY_INFO;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        /**
         * apply actor
         * @see http://10.0.0.55/mediawiki/index.php/OtherFunctions.applyForRealName
         */
        Apply.prototype.applyActor = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.APPLY_ACTOR;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        /**
         * re apply actor
         * @see http://10.0.0.55/mediawiki/index.php/OtherFunctions.reApplyForRealName
         */
        Apply.prototype.reApplyActor = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.RE_APPLY_ACTOR;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

        return Apply;
    });
})();