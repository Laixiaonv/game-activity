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
  })("kkUtils", function () {
    var kkUtils = {
      act2str: function (act) {
        if (!act) {
          act = 0;
        } else {
          act--;
        }
        var $msg = '<img src="/images/actlevel/' + act + '.gif"  class="actlevel"/>';
        return $msg;
      },
      rich2Str: function (rich, star) {
        if (!rich) {
          rich = 0;
        }
        if (!star) {
          star = 0;
        }
        var $padding = "";
        if (rich > 22 && rich <= 26) {
          $padding = "padding: 0 7px";
        } else if (rich > 26) {
          $padding = "padding: 0 20px";
        }
        var $msg = '<span class="rich_span"><img \n\
		style="' + $padding + ';background:url(/images/richlevel/v' + rich + '.gif) no-repeat center center" \n\
		 src="/images/star/' + ((star >= 0 && star <= 5) ? star : 0) + 's.gif" /></span>';
        return $msg;
      },
      getBestUserId: function (userInfo) {
        if (typeof userInfo != "object") {
          return "";
        } else {
          return userInfo.validId && userInfo.validId.id ? userInfo.validId.id : userInfo.userId;
        }
      },
      kingIDState2Str: function (isLight) {
        if (isLight === undefined) {
          isLight = 0;
        }

        var icon = "<span class='" + (isLight == 1 ? "honor_light" : "honor_gray") + "'></span>";
        return icon;
      },
      tenThousand: function (num, i18nFn) {
        if (!num || num <= 0) {
          return num;
        }
        if (num <= 9999) {
          return num;
        }

        num /= 10000;
        num = num.toFixed(1);
        num = Math.floor(num) == num ? parseInt(num) : num;

        return i18nFn instanceof Function ? i18nFn(num) : num;

      },
      facial2imageForRoom: function (facialString) {
        var facialArray = [{
          facial: "[x_22awesome]",
          img: "<img class='facial' src='/images/facepic/awesome.gif' style='width:28px;height:28px' />"
        }, {
          facial: "[x_10badluck]",
          img: "<img class='facial'src='/images/facepic/badluck.gif' style='width:28px;height:28px' />"
        }, {
          facial: "[x_19bye]",
          img: "<img class='facial' src='/images/facepic/bye.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_21dizzy]",
          img: "<img class='facial' src='/images/facepic/dizzy.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_25doubt]",
          img: "<img class='facial' src='/images/facepic/doubt.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_11drop]",
          img: "<img class='facial' src='/images/facepic/drop.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_07excited]",
          img: "<img class='facial' src='/images/facepic/excited.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_04fil]",
          img: "<img class='facial' src='/images/facepic/fil.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_01good]",
          img: "<img class='facial' src='/images/facepic/good.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_12grief]",
          img: "<img class='facial' src='/images/facepic/grief.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_13grimace]",
          img: "<img class='facial' src='/images/facepic/grimace.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_26guise]",
          img: "<img class='facial' src='/images/facepic/guise.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_09indecent]",
          img: "<img class='facial' src='/images/facepic/indecent.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_23jiong]",
          img: "<img class='facial' src='/images/facepic/jiong.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_03kiss]",
          img: "<img class='facial' src='/images/facepic/kiss.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_08laugh]",
          img: "<img class='facial' src='/images/facepic/laugh.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_14laughing]",
          img: "<img class='facial' src='/images/facepic/laughing.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_15lovely]",
          img: "<img class='facial' src='/images/facepic/lovely.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_20moving]",
          img: "<img class='facial' src='/images/facepic/moving.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_28nosebleed]",
          img: "<img class='facial'src='/images/facepic/nosebleed.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_16rage]",
          img: "<img class='facial'src='/images/facepic/rage.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_06revel]",
          img: "<img class='facial' src='/images/facepic/revel.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_17scare]",
          img: "<img class='facial'src='/images/facepic/scare.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_18sleep]",
          img: "<img class='facial' src='/images/facepic/sleep.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_24snicker]",
          img: "<img class='facial' src='/images/facepic/snicker.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_27sorry]",
          img: "<img class='facial' src='/images/facepic/sorry.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_05trick]",
          img: "<img class='facial' src='/images/facepic/trick.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_02up]",
          img: "<img class='facial' src='/images/facepic/up.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_29contempt]",
          img: "<img class='facial' src='/images/facepic/contempt.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_32lovely]",
          img: "<img class='facial' src='/images/facepic/cute.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_30idle]",
          img: "<img class='facial' src='/images/facepic/daze.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_35grievance]",
          img: "<img class='facial' src='/images/facepic/grievance.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_31ashamed]",
          img: "<img class='facial' src='/images/facepic/shy.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_34sleeping]",
          img: "<img class='facial' src='/images/facepic/sleep2.gif' style='width:28px;height:28px'  />"
        }, {
          facial: "[x_33vomit]",
          img: "<img class='facial' src='/images/facepic/vomit.gif' style='width:28px;height:28px'  />"
        }];
        for (var i = 0; i < facialArray.length; i++) {
          facialString = facialString.replace(new RegExp("\\" + facialArray[i].facial, "gm"), facialArray[i].img);
        }
        return facialString;
      },
      time2String: function (timeObj, __) {
        if (timeObj instanceof  Date) {
          timeObj = {start: timeObj};
        }
        var str, startTime, endTime;
        startTime = timeObj.start || new Date();
        endTime = new Date();

        var millisecondOffect = endTime - startTime, second, minute;

        if (millisecondOffect >= 0) {
          // 之前的时间
          second = Math.floor(millisecondOffect / 1000);
          minute = Math.floor(second / 60);
          if (second >= 0 && second <= 59) {
            str = __('just now');
          } else if (minute >= 0 && minute < 60) {
            str = __('utils minute before', minute);
          } else if (minute >= 60 && minute < 24 * 60) {
            str = __('utils hour before', Math.floor(minute / 60));
          } else {
            str = this.formatDate(startTime, "yyyy-MM-dd");
          }
        } else {
          // 将来时间
          millisecondOffect = Math.abs(millisecondOffect);
          second = Math.floor(millisecondOffect / 1000);
          minute = Math.floor(second / 60);
          if (second >= 1 && second <= 59) {
            str = __('soon');
          } else if (minute >= 1 && minute < 60) {
            str = __('utils minute after', minute);
          } else if (minute >= 60 && minute < 60 * 24) {
            str = __('utils hour after', Math.floor(minute / 60));
          } else {
            str = this.formatDate(startTime, "yyyy-MM-dd");
          }
        }
        return str;
      },
      liveTime2String: function (timeObj, __) {
        if (timeObj instanceof  Date) {
          timeObj = {start: timeObj};
        }
        var str, startTime, endTime;
        startTime = timeObj.start || new Date();
        endTime = new Date();

        var millisecondOffect = endTime - startTime, second, minute;

        if (millisecondOffect >= 0) {
          // 之前的时间
          second = Math.floor(millisecondOffect / 1000);
          minute = Math.floor(second / 60);
          if (second >= 0 && second <= 59) {
            str = __('just now');
          } else if (minute >= 0 && minute < 60) {
            str = __('utils minute', minute);
          } else if (minute >= 60 && minute < 24 * 60) {
            str = __('utils hour', Math.floor(minute / 60));
          } else {
            str = this.formatDate(startTime, "yyyy-MM-dd");
          }
        } else {
          // 将来时间
          millisecondOffect = Math.abs(millisecondOffect);
          second = Math.floor(millisecondOffect / 1000);
          minute = Math.floor(second / 60);
          if (second >= 1 && second <= 59) {
            str = __('soon');
          } else if (minute >= 1 && minute < 60) {
            str = __('utils minute after', minute);
          } else if (minute >= 60 && minute < 60 * 24) {
            str = __('utils hour after', Math.floor(minute / 60));
          } else {
            str = this.formatDate(startTime, "yyyy-MM-dd");
          }
        }
        return str;
      },
      formatDate: function (data, format) {
        var o = {
          "M+": data.getMonth() + 1, // month
          "d+": data.getDate(), // day
          "h+": data.getHours(), // hour
          "m+": data.getMinutes(), // minute
          "s+": data.getSeconds(), // second
          "q+": Math.floor((data.getMonth() + 3) / 3), // quarter
          "S": data.getMilliseconds()
          // millisecond
        }
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      },
      getRichImgePath: function (rich) {
        rich = rich || 0
        return '/images/richlevel/v' + rich + '.gif';
      },
      getVipIconPath: function (vip) {
        return '/images/' + vip + '.png'
      },
      getActImagePath: function (act) {
        act = act || 0;
        act = act == 0 ? 0 : (act - 1);
        return '/images/actlevel/' + act + '.gif';
      },
      stringLength: function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
          var c = str.charCodeAt(i);
          //单字节加1
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
          }
          else {
            len += 2;
          }
        }
        return len;
      },
      thousandFormat: function (num) {
        return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      },
      remainingTime: function (startTime, endTime, __) {
        var millisecondOffset = endTime - startTime,
          second,
          minute,
          hour,
          day,
          str;
        if (millisecondOffset < 0) {
          return false;
        }
        second = Math.floor(millisecondOffset / 1000);
        minute = Math.floor(second / 60);
        if (second >= 0 && second <= 59) {
          str = second + __('second');
        } else if (minute >= 0 && minute < 60) {
          str = 0 + __('hours') + minute + __('minute');
        } else if (minute >= 60 && minute < 24 * 60) {
          hour = Math.floor(minute / 60);
          minute = Math.floor(minute % 60);
          str = hour + __('hours') + minute + __('minute');
        } else {
          day = Math.floor(millisecondOffset / 86400000);
          hour = Math.floor((millisecondOffset % 86400000) / 3600000);
          minute = Math.floor((millisecondOffset % 3600000) / 60000);

          str = day + __('sign day') + hour + __('hours') + minute + __('minute');
        }

        return str;
      }
    };

    kkUtils.se = function simpleEncrypt(plaintext) {
      if (plaintext == undefined) {
        return plaintext;
      }
      if (typeof plaintext !== "string") {
        plaintext = plaintext.toString();
      }
      var cList = [];
      for (var i = 0; i < plaintext.length; i++) {
        var ch = plaintext.charCodeAt(i) << 4;
        cList.push(ch.toString(16));
      }
      return cList.join("*");
    };

    kkUtils.sd = function simpleDecrypt(ciphertext) {
      if (ciphertext == undefined) {
        return ciphertext;
      }
      if (typeof ciphertext !== "string") {
        ciphertext = ciphertext.toString();
      }
      var plaintext = "";
      try {
        ciphertext = "[\"" + ciphertext.replace(/\*/g, '","') + "\"]";
        var cList = JSON.parse(ciphertext);
      } catch (e) {
        return undefined;
      }
      for (var i = 0; i < cList.length; i++) {
        var ch = parseInt(cList[i], 16);
        ch = ch >> 4;
        plaintext += String.fromCharCode(ch);
      }
      return plaintext;
    };

    kkUtils.GIFT_URL_RESOURCE = {
      _ICON: 'https://rescdn.kktv8.com/kktv/icon/web/gift/png/%s.png',
      _GIF: 'https://rescdn.kktv8.com/kktv/icon/web/gift/gif/%s.gif',
      _SWF: 'https://rescdn.kktv8.com/kktv/icon/web/gift/swf/%s.swf',
      _PNG_80: 'https://rescdn.kktv8.com/kktv/icon/web/gift/png_80/%s.png',
      _PNG_40: 'https://rescdn.kktv8.com/kktv/icon/web/gift/png_40/%s.png',
      icon: function (id) {
        return this._ICON.replace("%s", id);
      },
      png: function (id, size) {
        size = size || 80;
        return this["_PNG_" + size].replace("%s", id);
      },
      gif: function (id) {
        return this._GIF.replace("%s", id);
      },
      swf: function (id) {
        return this._SWF.replace("%s", id);
      }
    };

    kkUtils.IMAGE_CDN_PATH_PREFIX = "https://ures.kktv8.com/kktv";
    kkUtils.defaultAvatar = "/images/user_head.png";
    kkUtils.defaultPoster = "/images/m_user_head.png";
    kkUtils.defaultMysPoster = "/images/image-isMys.png";
    kkUtils.defaultMan = "/images/gender/man.png";
    kkUtils.defaultWoman = "/images/gender/woman.png";

    return kkUtils;
  });
})();
