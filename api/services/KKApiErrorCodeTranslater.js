(function () {
    !(function (name, definition) {
        // Check exports
        var hasExports = typeof module !== 'undefined' && module.exports;
        if (hasExports) {
            module.exports = definition();
        } else {
            // Assign to common namespaces or simply the global object (window)
            this[name] = definition();
        }
    })("KKApiErrorCodeTranslater", function () {
        var map = {
            '00000000': 'request success',
            '10000001': 'unknown response',
            '10010107': 'buy car fail',
            '20001002': 'stored procedure exception',
            '20001003': 'stored procedure exception',
            '30001005, 30001007': 'token invalid',
            '30002002': 'lack of money',
            '30002001': 'user not found',
            '01010103': 'user name already exists',
            '01070103': 'user name or password error',
            '01130104': 'user in black list',
            '01130106, 01020104, 01310104': 'ip in black list',
            '01020106, 01310105': 'ip restrictions 1 hour',
            '01020107, 01310106': 'ip restrictions 24 hour',
            '10010902': 'search get data fail',
            '01220012,01220013,01180102': 'bind mobile has exist',
            '01180009':'verification code error',
            '05020102': "nickname is already exist",
            '05020004':"user name illegal",
            '50000002':"not in time",
            '20001001':"back err",
            "01020001":"user name invalid"
        };

        Object.keys(map).forEach(function (k) {
            if (/\,/.test(k)) {
                var val = map[k];
                var keys = k.split(',');
                for (var i = 0; i < keys.length; i++) {
                    map[keys[i].trim()] = val;
                }
                delete map[k];
            }
        });

        var helper = {
            translate: function (errObj, i18nCB) {
                if (!errObj || !(errObj instanceof KKApi.Client.APIError)) {
                    return undefined
                }

                if (errObj.name === KKApi.Client.APIError.SYSTEM_ERROR) {
                    errObj.message = 'system error';
                } else if (errObj.name === KKApi.Client.APIError.TIMEOUT_ERROR) {
                    errObj.message = 'timeout error';
                } else if (errObj.name === KKApi.Client.APIError.JSON_PARSE_ERROR) {
                    errObj.message = 'json parse error';
                } else if (errObj.name === KKApi.Client.APIError.REQUEST_ERROR) {
                    errObj.message = map[errObj.detail] || (KKApi.Client.APIError.UNKNOWN_ERROR + ":" + errObj.detail);
                } else {
                    errObj.message = KKApi.Client.APIError.UNKNOWN_ERROR
                }

                if (typeof i18nCB === 'function') {
                    errObj.i18n = i18nCB(errObj.message);
                    return errObj.i18n;
                }
                return errObj.message;
            }
        }

        return helper;
    });
})();
