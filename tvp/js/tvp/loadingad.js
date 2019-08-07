/*! TenVideoPlayer_V2 - v2.0.0 - 2018-10-23 11:05:06
 * Copyright (c) 2018
 * Powered by Tencent-Video Web Front End Team
*/
!function (a) {
    function b(b, c) {
        function d(b) {
            var c;
            try {
                var d = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser;
                d.async = !1
            } catch (e) {
                throw new Error("XML Parser could not be instantiated")
            }
            try {
                c = a.browser.ie ? d.loadXML(b) ? d : !1 : d.parseFromString(b, "text/xml")
            } catch (e) {
                throw new Error("Error parsing XML string")
            }
            return c
        }

        function e(b, d) {
            if (!b) return null;
            var h = "", i = null, j = null;
            b.childNodes && b.childNodes.length > 0 && a.each(b.childNodes, function (a, b) {
                var c = b.nodeType, d = f(b.localName || b.nodeName), j = b.text || b.nodeValue || "";
                if (8 != c) if (3 != c && 4 != c && d) i = i || {}, i[d] ? (i[d].length || (i[d] = g(i[d])), i[d][i[d].length] = e(b, !0), i[d].length = i[d].length) : i[d] = e(b); else {
                    if (j.match(/^\s+$/)) return;
                    h += j.replace(/^\s+/, "").replace(/\s+$/, "")
                }
            }), b.attributes && b.attributes.length > 0 && (j = {}, i = i || {}, a.each(b.attributes, function (a, b) {
                var c = f(b.name), d = b.value;
                j[c] = d, i[c] ? (i[c].length || (i[c] = g(i[c])), i[c][i[c].length] = d, i[c].length = i[c].length) : i[c] = d
            })), i && (h = i.text ? ("object" == typeof i.text ? i.text : [i.text || ""]).concat([h]) : h, h && (i.text = h), h = "");
            var k = i || h;
            return c && (h && (k = {}), h = k.text || h || "", h && (k.text = h), d || (k = g(k))), k
        }

        if (!b) return {};
        var f = function (a) {
            return String(a || "").replace(/-/g, "_")
        }, g = function (a) {
            return a.length || (a = [a]), a.length = a.length, a
        };
        if ("string" == typeof b && (b = d(b)), b.nodeType) {
            if (3 == b.nodeType || 4 == b.nodeType) return b.nodeValue;
            var h = 9 == b.nodeType ? b.documentElement : b, i = e(h, !0);
            return b = null, h = null, i
        }
    }

    a.xml2json = b
}(tvp.$), function () {
    function a() {
        this.cache = {}, this.wxCallbacks = []
    }

    if (!window.txvLogin) {
        var b = {
                set: function (a, b, c, d, e) {
                    if (e) {
                        var f = new Date, g = new Date;
                        g.setTime(f.getTime() + 36e5 * e)
                    }
                    return document.cookie = a + "=" + b + "; " + (e ? "expires=" + g.toGMTString() + "; " : "") + (d ? "path=" + d + "; " : "path=/; ") + (c ? "domain=" + c + ";" : "domain=" + window.location.host + ";"), !0
                }, get: function (a) {
                    var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
                    return c ? c[1] : ""
                }, del: function (a, b, c) {
                    var d = new Date;
                    d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
                }
            }, c = {
                ajax: function (a, b, c) {
                    if (!a || "function" != typeof b || "function" != typeof c) return {error: "ajax params error"};
                    var d;
                    if (window.jQuery && jQuery.ajax) d = jQuery.ajax; else if (window.Zepto && Zepto.ajax) d = Zepto.ajax; else {
                        if (!(window.tvp && tvp.$ && tvp.$.ajax)) return void c({error: "$.ajax not found"});
                        d = tvp.$.ajax
                    }
                    a.success = function (a) {
                        b(a)
                    }, a.error = function (a) {
                        c({error: a})
                    }, d(a)
                }
            }, d = navigator.userAgent.toLowerCase(),
            e = {isqqlive: d.indexOf("qqlive") > -1, isipad: d.search(/ipad/i) > -1};
        a.prototype = {
            isLogin: function (a) {
                a = a || function () {
                };
                var b = this;
                return e.isqqlive ? void this.tvGetCookie(["qq", "wx"], function (b) {
                    var c;
                    try {
                        "string" == typeof b ? c = JSON.parse(b) : "object" == typeof b && (c = b)
                    } catch (d) {
                    }
                    c && a(c.result && c.result.qq ? 1 : c.result && c.result.wx ? 2 : 0)
                }) : void this.getWXCookie(function (c) {
                    b.isQQLogin(function (d) {
                        return d && c && "qq" === c.main_login ? void a(1, null) : void b.isWXLogin(function (b) {
                            b && "wx" === b.main_login ? a(2, b) : a(0, null)
                        })
                    })
                })
            }, getUserInfo: function () {
                var a, b, c = this;
                if (arguments.length > 1 && "string" == typeof arguments[0]) {
                    var d = arguments[0];
                    a = "" === d ? 0 : d, b = arguments[1]
                } else b = arguments[0];
                "function" != typeof b && (b = function () {
                }), this.isLogin(function (d, f) {
                    if (0 === d) return void b({error: "not login"});
                    if (e.isqqlive) {
                        var g = a && [a];
                        return void c.tvGetUserInfo(g || ["qq", "wx"], function (c) {
                            var e, f;
                            try {
                                "string" == typeof c ? e = JSON.parse(c) : "object" == typeof c && (e = c)
                            } catch (g) {
                            }
                            if (!e) return void b({error: "parse tv cookie fail"});
                            1 === d ? f = "qq" : 2 === d && (f = "wx");
                            var h = a || f, i = h && e && e.result && e.result[h];
                            b(i && i.nickname ? {
                                nick: i.nickname,
                                face: i.headImgUrl,
                                type: f
                            } : {error: "get tv " + f + " user info fail"})
                        })
                    }
                    1 === d ? c.requestQQInfo(function (a) {
                        b(a && a.nick ? {nick: a.nick, face: a.qqface, type: "qq"} : {error: "requestQQInfo fail"})
                    }) : 2 === d && b(f && f.nick ? {
                        nick: decodeURIComponent(f.nick),
                        face: f.head,
                        type: "wx"
                    } : {error: "get weixin info fail"})
                })
            }, checkQQLogin: function (a) {
                a = a || function () {
                };
                var c = b.get("lskey"), d = b.get("luin"), e = b.get("uin"), f = b.get("skey");
                a(e && f ? 2 : c && d ? 1 : 0)
            }, isQQLogin: function (a) {
                a = a || function () {
                }, this.checkQQLogin(function (b) {
                    a(0 !== b)
                })
            }, isQQLowLogin: function (a) {
                a = a || function () {
                }, this.checkQQLogin(function (b) {
                    a(1 === b)
                })
            }, getUin: function (a) {
                a = a || function () {
                };
                var c;
                this.isQQLowLogin(function (d) {
                    c = d ? b.get("luin") : b.get("uin"), c ? (c = parseInt(c.replace(/^o0*/g, ""), 10), a(c)) : a(0)
                })
            }, getSkey: function (a) {
                a = a || function () {
                };
                var c = b.get("skey"), d = b.get("lskey");
                a(c || d)
            }, time33: function (a) {
                for (var b = 0, c = a.length, d = 5381; c > b; ++b) d += (d << 5) + a.charAt(b).charCodeAt();
                return 2147483647 & d
            }, gTk: function (a) {
                a = a || function () {
                };
                var b = this;
                this.getWXCookie(function (c) {
                    "wx" == c.main_login ? a(b.time33(c.vusession), "wx") : b.getSkey(function (c) {
                        var d = c ? b.time33(c) : "";
                        a(d, "")
                    })
                })
            }, requestQQInfo: function (a) {
                a = a || function () {
                };
                var b, d = this, e = function () {
                    d.checkQQLogin(function (c) {
                        return 0 === c ? void a({error: "qq not login"}) : (b = 1 === c ? 1 : 0, void f())
                    })
                }, f = function () {
                    c.ajax({
                        url: "//video.qq.com/fcgi-bin/get_userinfo",
                        data: {otype: "json", type: 2, _: +new Date, low_login: b},
                        dataType: "jsonp",
                        timeout: 5e3
                    }, function (b) {
                        b = {qqface: b.data[0].headurl, nick: b.data[0].nick}, a(b)
                    }, function (b) {
                        a(b)
                    })
                };
                e()
            }, openQQLogin: function (a) {
                a = a || {};
                var b = location.protocol + "//video.qq.com/fcgi-bin/qq_login?redirect_url=" + encodeURIComponent(a.s_url || location.href);
                delete a.s_url;
                var c = "//ui.ptlogin2.qq.com/cgi-bin/login?", d = {
                    link_target: "blank",
                    low_login: 0,
                    target: "self",
                    style: 9,
                    appid: "532001601",
                    pt_no_onekey: 0,
                    s_url: encodeURIComponent(b)
                }, e = [];
                for (var f in d) a.hasOwnProperty(f) ? e.push(f + "=" + a[f]) : e.push(f + "=" + d[f]);
                c += e.join("&"), setTimeout(function () {
                    window.location.href = c
                }, 200)
            }, qqLogout: function () {
                b.set("nickCookie", "", location.host, "/", -24), b.set("encuinCookie", "", location.host, "/", -24), b.set("skey", "", ".qq.com", "/", -24), b.set("uin", "", ".qq.com", "/", -24), this.isQQLowLogin(function (a) {
                    a && (b.set("lskey", "", ".qq.com", "/", -24), b.set("luin", "", ".qq.com", "/", -24))
                }), (new Image).src = "//video.qq.com/fcgi-bin/logout?_=" + Math.random()
            }, openWXLogin: function (a) {
                a = a || window.location.href;
                var b = "//video.qq.com/fcgi-bin/wx_login?from=1&redirect_url=" + encodeURIComponent(a);
                document.location.href = b
            }, getWXCookie: function (a) {
                a = a || function () {
                };
                var b = this, c = location.protocol + "//video.qq.com/getcookie/getcookie.html.html";
                if (c += "?t=" + +new Date, "qq.com" !== document.domain) return void a({error: "document.domain\u4e0d\u7b49\u4e8eqq.com\uff0c\u8de8\u57df\u5931\u8d25"});
                if (b.cache.wxAuthCache) return void a(b.cache.wxAuthCache);
                b.wxCallbacks.push(a), window.txvGetLoginCookiesCallback = function (c) {
                    if (b.cache.wxAuthCache = c, setInterval(function () {
                        b.cache.wxAuthCache = null
                    }, 2e4), !b.wxCallbacks || !b.wxCallbacks.length) return void a(c);
                    for (var d; b.wxCallbacks.length;) d = b.wxCallbacks.shift(), "function" == typeof d && d.call(b, c)
                };
                var d = "tvp_login_cross_domin_frame", e = document.getElementById(d);
                e ? e.src = c : (e = document.createElement("iframe"), e.src = c, e.id = d, e.style.display = "none", document.body.appendChild(e))
            }, isWXLogin: function (a) {
                a = a || function () {
                };
                var b = this, c = {};
                this.getWXCookie(function (d) {
                    return d && d.access_token && d.appid && d.openid && d.vuserid && d.vusession && d.refresh_token ? void b.checkWXLogin(function (b) {
                        if (!b || b.errcode + "" != "0") return void a(!1);
                        if (b && b.vuserid && b.access_token) {
                            for (var e in d) c[e] = d[e];
                            for (var e in b) c[e] = b[e];
                            a(c)
                        } else a(!1)
                    }) : void a(!1)
                })
            }, checkWXLogin: function (a) {
                a = a || function () {
                };
                var b = "//video.qq.com/fcgi-bin/check_login",
                    d = c.ajax({url: b, timeout: 5e3, dataType: "jsonp"}, function (b) {
                        a(b)
                    }, function (b) {
                        a(b)
                    });
                d && d.error && a(d)
            }, wxLogout: function (a) {
                a = a || function () {
                };
                var b = "//video.qq.com/fcgi-bin/logout";
                this.cache && this.cache.wxAuthCache && (this.cache.wxAuthCache = null);
                var d = c.ajax({url: b, dataType: "jsonp", timeout: 5e3}, function (b) {
                    a(b)
                }, function (b) {
                    a(b)
                });
                d && d.error && a(d)
            }, tenvideoJSReady: function (a) {
                return a = a || function () {
                }, "object" == typeof window.TenvideoJSBridge ? void a() : void document.addEventListener("onTenvideoJSBridgeReady", function () {
                    a()
                }, !1)
            }, tvLogin: function (a, b) {
                b = b || function () {
                }, this.tenvideoJSReady(function () {
                    TenvideoJSBridge.invoke("actionLogin", {type: a}), TenvideoJSBridge.on("onActionLoginFinish", b), TenvideoJSBridge.on("actionLoginFinish", b)
                })
            }, tvLoginQQ: function (a) {
                a = a || function () {
                }, this.tvLogin("qq", a)
            }, tvLoginWX: function (a) {
                a = a || function () {
                }, this.tvLogin("wx", a)
            }, tvLoginTV: function (a) {
                a = a || function () {
                }, this.tvLogin("tv", a)
            }, tvSwitchLogin: function (a, b) {
                b = b || function () {
                }, e.isipad ? b(new Error("iPad not support SwitchLogin")) : this.tenvideoJSReady(function () {
                    TenvideoJSBridge.invoke("switchLoginState", {userType: a}), TenvideoJSBridge.on("onSwitchLoginStateResponse", function (a) {
                        var c;
                        if ("string" == typeof a) try {
                            c = JSON.parse(a)
                        } catch (d) {
                        } else c = a;
                        if (c && 0 === parseInt(c.errCode)) b(null, c); else {
                            var e = c && c.errCode || -100, f = c && c.errMsg || "app error", g = new Error(f);
                            g.code = e, g.result = a, b(g)
                        }
                    })
                })
            }, tvGetCookie: function (a, b) {
                this.tenvideoJSReady(function () {
                    TenvideoJSBridge.invoke("getCookie", {type: a}, b)
                })
            }, tvGetMainCookie: function (a) {
                this.tenvideoJSReady(function () {
                    TenvideoJSBridge.invoke("getMainCookie", null, a)
                })
            }, tvGetUserInfo: function (a, b) {
                this.tenvideoJSReady(function () {
                    TenvideoJSBridge.invoke("getUserInfo", {type: a}, b)
                })
            }
        };
        var f = new a;
        f.cookie = b, window.txvLogin = f
    }
}(), function (a, b) {
    function c(c) {
        var d = {cmd: 3541, appId: w.player.config.appid, vid: w.player.curVideo.getFullVid()};
        a.report(b.extend(d, c))
    }

    function d() {
        w.player && w.player.DurationLimitInstance && "function" === b.type(w.player.DurationLimitInstance.hide) && w.player.DurationLimitInstance.hide()
    }

    function e(a, b) {
        c({itype: a, val: b}), f()
    }

    function f(a) {
        a = a || {}, x = [], y = 0, E = !1, B = b.noop, L.skipRemain = 0, w.config.$control && w.config.$moreLink && (w.config.$moreLink.addClass(H), w.config.$qqvipSkip.find(".tvp_ads_num").text(""), w.config.$countdownContainer.text("")), w.player && w.player.$video && (w.player.$video.off("ended.loadingad"), w.player.$video[0].pause()), w.onEnd(a), i(5), g()
    }

    function g() {
        M = {adFinishList: [], time: {}, requestid: a.$.newGuid()}, x = []
    }

    function h() {
        return a.common.get_chid()
    }

    function i(c) {
        if (c) {
            w.adJson = w.adJson || {}, w.adJson.adLoc = w.adJson.adLoc || {}, w.adJson.adGetv = w.adJson.adGetv || {};
            var d, e = w.player.curVideo.getDuration && w.player.curVideo.getDuration() || 0,
                f = w.player.videoTag.currentTime, g = b.cookie.get("luin") || b.cookie.get("uin") || "", i = {}, j = {
                    requestid: M.requestid,
                    pf: "H5",
                    chid: h(),
                    adtype: "WL",
                    timestamp: +new Date,
                    mvid: w.player.curVideo.getFullVid(),
                    videoDuration: e,
                    coverid: w.player.curVideo.getCoverId(),
                    qq: g
                };
            d = "http://dp3.qq.com/qqvideo/?", M.errorcode = M.errorcode || "";
            var k = [], l = [], m = [];
            if (w.adJson && w.adJson.adList && w.adJson.adList.item) {
                var n = "object" === b.type(w.adJson.adList.item) ? [w.adJson.adList.item] : w.adJson.adList.item;
                b(n).each(function (a, c) {
                    c.order_id && c.duration && (c.duration && m.push(c.duration), c.image && c.image.vid ? l.push(c.image.vid) : "array" === b.type(c.image) && c.image.length && c.image[0].vid && l.push(c.image[0].vid), k.push(c.order_id))
                })
            }
            M.oid = k.join(","), M.vid = l.join(","), M.videopt = m.join(","), M.adFinishList && w.adList && M.adFinishList.length === w.adList.length ? M.isskip = 0 : M.isskip = 1, M.time.playTimeout ? M.adtt = M.time.playTimeout - M.time.playing_first : M.adtt = M.adTimeCount, 2 === c && (w.adJson.adLoc.duration <= 0 && (M.errorcode = "201"), w.adJson.adLoc.vid2aid <= 0 && (M.errorcode = "203"));
            var o = [];
            if (5 === c) {
                for (var p in M.adPlayedTime) o.push(parseInt(M.adPlayedTime[p]));
                o && o.length ? M.videott = o.join(",") : M.videott = ""
            }
            var q = {
                1: {},
                2: {
                    vid2aid: w.adJson.adLoc.vid2aid || 0,
                    aid2oid: M.aid2oid,
                    oid2url: w.adJson.adGetv.oid2url || 0,
                    merged: 1,
                    adaptor: 1,
                    errorcode: M.errorcode,
                    adid: w.adJson.adLoc.aid || "",
                    oid: M.oid,
                    vid: M.vid
                },
                3: {videofbt: M.videofbt, errorcode: M.errorcode},
                4: {isskip: M.isskip, errorcode: M.errorcode, adDidShowTime: f},
                5: {errorcode: M.errorcode, adtt: M.adtt, videopt: M.videopt, videott: M.videott}
            };
            q.hasOwnProperty(c) && (i = b.extend(j, q[c]), i.step = c, i.errorcode || delete i.errorcode, d += b.param(i), a.report(d))
        }
    }

    function j(c) {
        var d = {url: "", width: 0, height: 0}, e = b.Deferred();
        return c && c.image && c.duration > 0 ? (c.image = (b.isArray(c.image) ? c.image[0] : c.image) || {}, "1" == w.adJson.adGetv.merged && /^http\:\/\//.test(c.image.url) ? e.resolve({
            url: c.image.url,
            width: c.image.width,
            height: c.image.height
        }) : c.image.vid ? a.h5Helper.loadVideoUrlByVid({
            vid: c.image.vid,
            isPay: !1,
            isAd: !0,
            loadingAdCgi: "//h5vv.video.qq.com/getmind?callback=?&"
        }).done(function (a) {
            a || (M.errorcode = "203"), e.resolve({url: a, width: c.image.width, height: c.image.height})
        }).fail(function () {
            M.errorcode = "203", e.resolve()
        }) : e.resolve(d)) : e.resolve(d), e
    }

    function k(c) {
        c && (i(4), l(), setTimeout(function () {
            return a.$.browser.MQQClient && window.mqq && mqq.ui && b.isFunction(mqq.ui.openUrl) && c && "buluo.qq.com" === location.hostname ? void mqq.ui.openUrl({
                url: c,
                target: 1,
                style: 0
            }) : void (b.os.phone ? window.location.href = c : window.open(c))
        }, 200))
    }

    function l() {
        var a, c = w, d = [];
        "number" === b.type(c.currentAdIndex) && (a = c.adList[c.currentAdIndex], a && (a.clickReportUrlOther && a.clickReportUrlOther.reportitem && ("array" === b.type(a.clickReportUrlOther.reportitem) ? d = d.concat(a.clickReportUrlOther.reportitem) : d.push(a.clickReportUrlOther.reportitem)), a.clickReportUrl && a.clickReportUrl.reportitem && ("array" === b.type(a.clickReportUrl.reportitem) ? d = d.concat(a.clickReportUrl.reportitem) : d.push(a.clickReportUrl.reportitem)), a.clickReportUrlSDK && a.clickReportUrlSDK.reportitem && ("array" === b.type(a.clickReportUrlSDK.reportitem) ? d = d.concat(a.clickReportUrlSDK.reportitem) : d.push(a.clickReportUrlSDK.reportitem)), b.each(d, function (a, b) {
            b.url && t(b.url)
        })))
    }

    function m() {
        return b.os.iphone ? "iphone" : b.os.ipad ? "ipad" : b.os.android ? "aphone" : b.os.Mac ? "mac" : void 0
    }

    function n(b) {
        if (!b) return {};
        var c = w, d = b.oIdx;
        return {
            pf_ex: m(),
            from: K,
            v: a.ver,
            dura: c.player.getDuration && c.player.getDuration() || "",
            coverid: c.player.curVideo.getCoverId(),
            vid: c.player.curVideo.getFullVid(),
            vptag: a.common.getPtag() || "",
            url: document.URL,
            chid: a.common.get_chid(),
            oadid: c.adJson.adLoc.aid || "",
            lcount: d || 1,
            t: 1e3 * b.ReportTime,
            tpid: c.adJson.adLoc.tpid || ""
        }
    }

    function o(a, d) {
        var e = x[d] || {}, g = "click", h = [], j = 0, l = a.get(0);
        e && (e.reportUrl || e.reportUrlOther || e.reportUrlSDK) && (e.reportUrl && (j = isNaN(e.ReportTime) ? 0 : Math.ceil(e.ReportTime / 1e3), h.push({
            time: j,
            url: u(e.reportUrl, {pf_ex: m(), tpid: w.adJson.adLoc.tpid || ""}),
            isOther: !1
        })), e.reportUrlOther && e.reportUrlOther.reportitem && (b.isArray(e.reportUrlOther.reportitem) || (e.reportUrlOther.reportitem = [e.reportUrlOther.reportitem]), b.each(e.reportUrlOther.reportitem, function (a, b) {
            b && b.url && (j = isNaN(b.reporttime) ? 0 : Math.ceil(b.reporttime / 1e3), h.push({
                time: j,
                url: b.url,
                isOther: !0
            }))
        })), e.reportUrlSDK && e.reportUrlSDK.reportitem && (b.isArray(e.reportUrlSDK.reportitem) || (e.reportUrlSDK.reportitem = [e.reportUrlSDK.reportitem]), b.each(e.reportUrlSDK.reportitem, function (a, b) {
            b && b.url && (j = isNaN(b.reporttime) ? 0 : Math.ceil(b.reporttime / 1e3), h.push({
                time: j,
                url: b.url,
                isOther: !0
            }))
        }))), p(d), B = function (a) {
            w.player && w.player.config && w.player.config.isSkipLoadingAd && w.isSkipLoadingAd && "number" === b.type(w.player.config.skipLoadingAdTime) && L.skipRemain >= 0 && (L.skipRemain = parseInt(w.player.config.skipLoadingAdTime + 1 - a.currentTime), L.skipRemain >= w.player.config.skipLoadingAdTime && (L.skipRemain = w.player.config.skipLoadingAdTime), L.skipRemain <= 0 ? (w.config.$skipLink.attr("data-skip", 1).find(".tvp_ads_skip_text").text(w.player.config.skipLoadingAdCloseText), w.config.$skipLink.find(".tvp_btn_close").removeClass(H)) : w.config.$skipLink.attr("data-skip", 0).find(".tvp_ads_skip_text").text(w.player.config.skipLoadingAdText.replace("{$sec}", parseInt(L.skipRemain))), w.config.$skipLink.removeClass(H)), M.errorcode = "";
            var c, d = Math.floor(a.currentTime), f = D - d, g = w.getUserStatus(), i = G - d;
            f = isNaN(f) || 0 > f ? 0 : f, i = isNaN(i) ? 0 : i, w.config.$countdownContainer.text(f), 1 == w.adFlag || g != I.QQVIP && g != I.QQSVIP ? (w.config.$qqvipSkip.addClass(H), w.config.$skipLink.find(".tvp_ads_skip_text").removeClass(H), w.config.$skipLink.removeClass(H)) : (w.config.$skipLink.addClass(H), w.config.$qqvipSkip.find("._remain").text(x.length - y), c = g == I.QQSVIP ? "\u8d85\u7ea7\u4f1a\u5458" : "QQ\u4f1a\u5458", w.config.$qqvipSkip.find("._vipname").text(c), i > 0 ? (w.config.$qqvipSkip.find(".tvp_ads_skip_text").addClass("tvp_disabled"), w.config.$qqvipSkip.find(".tvp_ads_num").text(i), w.config.$qqvipSkip.find("._remaintime").removeClass(H)) : (w.config.$qqvipSkip.find("._remaintime").addClass(H), w.config.$qqvipSkip.find(".tvp_ads_skip_text").removeClass("tvp_disabled")), w.config.$qqvipSkip.removeClass(H)), b.each(h, function (a, c) {
                var d = 2 === w.player.config.type ? w.player.getCurTime() : 0;
                if (c && (d > c.time && d - c.time < 1 || c.time <= d)) {
                    var f = {url: document.URL};
                    c.isOther || (f = b.extend(f, v(e.oIdx, e, c.time))), t(u(c.url, f)), h[a] = void 0
                }
            })
        }, w.config.$skipLink.off(g).on(g, function (a) {
            var d = b(this);
            return w.player.config && w.player.config.isSkipLoadingAd && w.isSkipLoadingAd ? void ("1" === d.attr("data-skip") && (M.isskip = !0, i(4), f({noOrder: !1}))) : b.isFunction(window.__tenplay_getuinfo) ? (w.skipAd(), void c({
                itype: 5,
                val: w.adFlag
            })) : (a && a.preventDefault && a.preventDefault(), w.noAdHandler(), !1)
        }), w.config.$qqvipSkip.find(".tvp_ads_skip_text").off(g).on(g, function () {
            w.skipAd(), c({itype: 6, val: w.adFlag})
        }), e.link ? (w.config.$moreLink.off(g).on(g, function () {
            l && l.pause(), c({itype: 4, val: 1}), k(w.config.$moreLink.attr("data-link"))
        }).attr("data-link", e.link), w.config.$adLink.off(g).on(g, function () {
            l && l.pause(), c({itype: 4, val: 2}), k(w.config.$adLink.attr("data-link"))
        }).attr("data-link", e.link)) : (w.config.$adLink.attr({
            href: "javascript:;",
            "data-link": ""
        }), w.config.$moreLink.attr({href: "javascript:;"}).addClass(H)), !l.paused && e.link && w.config.$adLink.attr("data-link", e.link)
    }

    function p(a) {
        var c = 0, d = 0;
        if (!isNaN(a) && b.isArray(x) && x.length > a) for (d = x.length; d > a; a++) x[a] && x[a].duration > 0 && (c += parseInt(x[a].duration, 10));
        D = Math.floor(c / 1e3)
    }

    function q(a) {
        var c, d, e, f = [];
        a = b.isArray(a) ? a : [];
        var g;
        for (c = 0, d = a.length; d > c; c++) e = a[c] || {}, e.oIdx = c + 1, e && e.image && e.duration > 0 && (e.image = (b.isArray(e.image) ? e.image[0] : e.image) || {}, e.image && (e.image.url || e.image.vid)) ? (g = e.link + "&" + b.param(n(e)), e.link = "Y" === e.no_click ? "" : g, f.push(e)) : e && (e.reportUrl && t(u(e.reportUrl, v(e.oIdx, e))), e.reportUrlOther && "string" == b.type(e.reportUrlOther.reportitem) ? t(u(e.reportUrlOther.reportitem, {url: document.URL})) : e.reportUrlOther && b.isArray(e.reportUrlOther.reportitem) && b.each(e.reportUrlOther.reportitem, function (a, b) {
            b && b.url && t(u(b.url, {url: document.URL}))
        }));
        return f
    }

    function r() {
        E && (c({itype: 8, val: w && w.aidInfo ? w.aidInfo.oaid : ""}), B = b.noop, w.next())
    }

    function s(a) {
        var c = {step: a, pf_ex: m(), tpid: w.adJson.adLoc.tpid || ""};
        0 == y && b.isArray(x) && x[y] && x[y].reportUrl && (c = b.extend(v(x[y].oIdx, x[y]), c), t(u(x[y].reportUrl, c)))
    }

    function t(b) {
        var c = a.common.getParams(b), d = document.createElement("a");
        d.href = b;
        var b = d.protocol + "//" + d.host + d.pathname + "?";
        b += a.$.param(c), d = null, a.report(b)
    }

    function u(a, c) {
        return "string" == b.type(a) && c && (a += -1 == a.indexOf("?") ? "?" : "&" + b.param(c)), a
    }

    function v(b, c, d) {
        var e;
        return e = 2 === w.player.config.type ? isNaN(d) ? Math.ceil(w.player.getCurTime()) : d : 0, e = c && c.ReportTime < e ? c.ReportTime : e, {
            from: K,
            pf: J,
            v: a.ver,
            dura: w.aidInfo.duration || w.player.curVideo.getDuration && w.player.curVideo.getDuration(),
            coverid: w.player.curVideo.getCoverId(),
            vid: w.player.curVideo.getFullVid(),
            vptag: a.common.getPtag() || "",
            url: document.URL,
            oadid: w.adJson.adLoc.aid || "",
            lcount: b || 1,
            t: 1e3 * e,
            chid: h()
        }
    }

    var w, x = [], y = 0, z = "http://film.qq.com/promote/openvip.html?ptag=cover.flash.h5skipad",
        A = "http://film.qq.com/weixin/hollywood.html", A = "http://film.qq.com/weixin/upay.html?aid=V0$$4:1",
        B = b.noop, C = -1, D = 0, E = !1, F = !1, G = 5, H = "tvp_none",
        I = {UNKNOWN: -1, NOTLOGIN: 0, LOGIN: 1, HLWVIP: 2, QQVIP: 4, QQSVIP: 5}, J = "H5", K = "6",
        L = {playingTime: 0, prevTime: 0, skipRemain: 0},
        M = {adFinishList: [], time: {}, requestid: a.$.newGuid(), adPlayedTime: {}};
    b.os.phone || b.os.tablet ? b.os.ipad ? K = "6" : b.os.iphone ? K = "3" : b.os.android && b.os.tablet ? K = "4" : b.os.android && b.os.phone && (K = "5") : K = "0", window.txv || (window.txv = {});
    var N;
    a.Html5LoaingAd = function () {
        this.onStart = this.onEnd = this.onPause = b.noop, this.adFlag = -1, this.aidInfo = {}, w = this
    }, a.Html5LoaingAd.fn = a.Html5LoaingAd.prototype = {
        isLogin: function () {
            return txv.login && txv.login.isLogin()
        }, openLogin: function (a) {
            a = b.isFunction(a) ? a : b.noop, txv.login ? txv.login.openLogin({success: a}) : window.txvLogin && txvLogin.isQQLogin(function (a) {
                a ? window.__tenplay_skipad ? __tenplay_skipad() : window.location.href = z : window.__tenplay_skipad ? window.__tenplay_skipad() : txvLogin.openQQLogin()
            })
        }, getUserStatus: function () {
            var a = I.UNKNOWN;
            if (-1 != C) switch (parseInt(C, 10)) {
                case 1:
                    a = I.HLWVIP;
                    break;
                case 2:
                    a = I.QQVIP;
                    break;
                case 3:
                    a = I.QQSVIP;
                    break;
                case 0:
                    a = I.LOGIN
            } else b.isFunction(window.__tenplay_getuinfo) && (a = window.__tenplay_getuinfo());
            return a
        }, hasLoginInfo: function () {
            var b = a.$.cookie.get("skey"), c = a.$.cookie.get("uin"), d = a.$.cookie.get("lskey"),
                e = a.$.cookie.get("luin");
            return b && c ? 1 : d && e ? 2 : N && N.vuserid ? 3 : 0
        }, getAdData: function (d) {
            function g() {
                var a = document.referrer;
                if (!a && top !== window) try {
                    a = top.location.href
                } catch (b) {
                }
                return a
            }

            if (w.player && w.player.curVideo && b.isFunction(w.player.curVideo.getRequestAd) && w.player.curVideo.getRequestAd() === !1) return void f({noOrder: !0});
            var j, k, l = "http://livew.l.qq.com/livemsg?", n = b.now();
            if ("https:" === location.protocol && (l = "https://livew.l.qq.com/livemsg?"), "function" != typeof XMLHttpRequest && "object" != typeof XMLHttpRequest) return void f();
            if (j = new XMLHttpRequest, !("withCredentials" in j)) return void f();
            var o = 2 === w.player.config.type ? w.player.curVideo.getFullVid() : w.player.curVideo.getChannelId(),
                p = {
                    pf: "H5",
                    ad_type: "WL",
                    url: location.href,
                    ty: "web",
                    pf_ex: m(),
                    plugin: "1.0.0",
                    v: a.ver,
                    coverid: w.player.curVideo.getCoverId(),
                    vid: o,
                    vptag: a.common.getPtag(),
                    adaptor: 1,
                    dtype: 1,
                    live: 2 === w.player.config.type ? 0 : 1,
                    _time_random: +new Date,
                    refer: g(),
                    appversion: "151012"
                };
            N && N.vuserid && N.vusession && (p.uid = N.vuserid, p.tkn = N.vusession, p.lt = "wx");
            var q = h();
            l += b.param(p), "" !== q && (l += "&chid=" + q), w.player && w.player.config && w.player.config.loadingadChid && (l += "&newstp=" + w.player.config.loadingadChid);
            try {
                j.timeout = 5e3
            } catch (r) {
            }
            var s = function (a) {
                return a && a.adList && a.adList.item && b(a.adList.item).each(function (a, b) {
                    b.link = b.link + "&lcount=" + (a + 1), b.reportUrl = b.reportUrl + "&lcount=" + (a + 1)
                }), a
            };
            j.ontimeout = function () {
                M.errorcode = "205", c({itype: 2, val: 500, speed: b.now() - n}), e(2, 505)
            }, j.onreadystatechange = function () {
                var a = {};
                k && clearInterval(k) && (k = null), 4 == j.readyState && 200 == j.status && j.responseText ? (c({
                    itype: 2,
                    val: 0,
                    speed: b.now() - n
                }), a = b.xml2json(j.responseXML || j.responseText), a ? (a = s(a), w.adJson = a, i(2), w.checkAdOrder(a, d)) : (M.errorcode = "202", e(2, 500))) : 4 == j.readyState ? (c({
                    itype: 2,
                    val: 500,
                    speed: b.now() - n
                }), e(2, j.status || 500)) : k = setTimeout(function () {
                    e(2, 500)
                }, 4e3)
            }, j.open("GET", l, !0), j.withCredentials = !0, c({
                itype: 2,
                val: 0
            }), j.send(), w.player.$video && "function" === b.type(w.player.$video.trigger) && w.player.$video.trigger("tvp:loading:livereport", {step: 3})
        }, checkAdOrder: function (a, c) {
            if (x = [], a && a.adList && a.adList.item && (b.isArray(a.adList.item) ? x = a.adList.item : a.adList.item.image && x.push(a.adList.item)), x = q(x), M.adTimeCount = 0, b(x).each(function (a, b) {
                b.duration && (M.adTimeCount += parseInt(b.duration, 10))
            }), w.adList = x, x.length > 0) {
                if (y = 0, w.player && w.player.config && w.player.config.isSkipLoadingAd && (1 === x.length ? w.isSkipLoadingAd = !0 : w.isSkipLoadingAd = !1), M.errorcode = 301, a && a.adGetv && "1" == a.adGetv.merged) return void w.play({
                    link: x[0].link,
                    url: x[0].image ? x[0].image.url : "",
                    duration: parseInt(x[0].duration) / 1e3
                });
                j(x[0]).done(function (a) {
                    w.play(a)
                })
            } else M.errorcode = "101", f({noOrder: !0, isReplay: c})
        }, getAdId: function () {
        }, play: function (a) {
            var e = w.player.$video, f = w.player.videoTag;
            return a && a.url && 0 != a.width && 0 != a.height ? (!b.browser.WeChat && "setAttribute" in f ? f.setAttribute("src", a.url) : f.src = a.url, w.config.$container.removeClass(H), s(0), e.on("tvp:player:videochange", function () {
                w.ad_has_played = !1
            }).off("ended.loadingad", r).on("ended.loadingad", r).one("playing.loadingad", function () {
                d(), w.ad_has_played || (b(this).trigger("tvp:loading:livereport", {step: 7}), b(this).trigger("tvp:player:adstart")), w.ad_has_played = !0, E && (w.player && w.player.config && w.player.config.autoplay === !1 && w.player.$video.one("tvp:video:src", function () {
                    this.load(), e.trigger("overlay_ctrl_showplay")
                }), !F && b.isFunction(w.onStart) && (w.onStart(), F = !0), w.config.$control && w.config.$moreLink && (w.config.$control.removeClass(H), w.config.$moreLink.removeClass(H)), 1 == w.adFlag && w.config.$skipLink && (w.getUserStatus() == I.HLWVIP ? w.config.$skipLink.removeClass(H) : w.config.$skipLink.addClass(H)), s(1), c({
                    itype: 7,
                    val: w && w.aidInfo ? w.aidInfo.oaid : ""
                }), E && (M.time.playing || (M.time.playing_first = +new Date), M.time.playing = +new Date, M.hasOwnProperty(y) || (M[y] = M.time.playing - M.time.play, M.videofbt = M[y], M.errorcode = "", i(3))))
            }), e.off("error.loadingad").on("error.loadingad", function () {
                M.errorcode = 207, i(3), w.ad_has_played = !0, w.next()
            }), (w.ad_has_played === !0 || w.videoChange || w.player && w.player.config && w.player.config.loadingadAutoplay) && (f.load(), f.play()), E = !0, w.currentAdIndex = y, void o(e, y)) : void w.next()
        }, next: function () {
            M.adFinishList.push(y), y++, b.isArray(x) && x[y] ? j(x[y]).done(function (a) {
                w.play(a)
            }) : f({noOrder: !1})
        }, getLoginUserVipInfo: function () {
            var c = b.Deferred(), d = "http://pay.video.qq.com/fcgi-bin/payvip?callback=?";
            "https:" === location.protocol && (d = "https://sec.video.qq.com/p/pay.video/fcgi-bin/payvip?callback=?");
            var e = w.hasLoginInfo(), f = 2 === e, g = 3 === e, h = a.common.getToken(f), i = a.common.getUin(f);
            if (g) i = ""; else if (!i) return c.resolve(), c;
            return b.ajax({
                url: d,
                dataType: "jsonp",
                jsonpCallback: "tvp_request_payvip_callback_" + parseInt(1e6 * Math.random()),
                data: {uin: i, g_tk: h, otype: "json"}
            }).done(function (a) {
                a && "1" == a.vip && (C = 1), c.resolve()
            }), c
        }, create: function (a, e) {
            if (!a || b.isUndefined(txv)) return void w.onEnd();
            a && a.$video && a.$video.on("tvp:player:videochange", function () {
                w.videoChange = !0
            });
            var f = {
                $container: null,
                $control: null,
                $countdownContainer: null,
                $skipLink: null,
                $moreLink: null,
                $adLink: null,
                $copyrightTips: null
            };
            this.config = b.extend(f, e), this.player = a;
            var g = function () {
                !window.__tenplay_getuinfo && w.hasLoginInfo() ? w.getLoginUserVipInfo().done(function () {
                    w.getAdData()
                }) : w.getAdData()
            };
            if (window.txvLogin && txvLogin.isWXLogin && b.browser.WeChat) try {
                var h = b.Deferred();
                txvLogin.isWXLogin(function (a) {
                    N = a, h.resolve()
                }), h.done(function () {
                    g()
                }), setTimeout(function () {
                    h.resolve()
                }, 3e3)
            } catch (j) {
            } else g();
            w.config.$adLink.addClass(H), a.$video && (this.config.$control && this.config.$moreLink && this.config.$moreLink.addClass(H), this.config.$copyrightTips && this.config.$copyrightTips.on("touchend", ".tvp_btn_close,.tvp_ads_btn", function () {
                w.config.$copyrightTips.addClass(H), w.player.videoTag.play(), w.config.$container.addClass("tvp_ads_ontop")
            }), a.$video.on("timeupdate", function () {
                E && b.isFunction(B) && B(this), E && (d(), M.adPlayedTime || (M.adPlayedTime = {}), M.adPlayedTime[y] = this.currentTime)
            }).on("pause paused", function () {
                !a.isTouching && a.$video && a.$video[0] && !a.$video[0].ended && a.$video.trigger("overlay_ctrl_showplay"), E && w.config.$adLink && b.isFunction(w.config.$adLink.addClass) && (w.config.$adLink.addClass(H), c({itype: 3}))
            }).on("play", function () {
                M.time.play = +new Date, setTimeout(function () {
                    if (E && w.config.$adLink) {
                        var a = w.config.$adLink.attr("data-link");
                        a && w.config.$adLink.removeClass(H), M.time.play = +new Date
                    }
                }, 500)
            })), txv.login && (txv.login.addLoginCallback(function () {
                C = -1
            }), txv.login.addLogoutCallback(function () {
                C = -1
            })), i(1)
        }, noAdHandler: function () {
            function a() {
                var a = window.location.href, b = "http://v.qq.com/h5/login/middle.html?low_login=1";
                b = b + "&ru=" + encodeURIComponent(a), window.location.href = b
            }

            var c = this, d = parseInt(c.getUserStatus(), 10);
            b.browser.qqlive ? txvLogin.tvGetCookie(["qq"], function (a) {
                var b, c = d === I.HLWVIP || d === I.QQVIP || d === I.QQSVIP;
                try {
                    b = JSON.parse(a)
                } catch (e) {
                }
                return b && b.result && b.result.qq ? c ? void f() : void (window.location.href = z) : void txvLogin.tvLoginQQ(function () {
                    window.location.reload()
                })
            }) : d === I.NOTLOGIN || 0 === w.hasLoginInfo() ? a() : d === I.HLWVIP || d === I.QQVIP || d === I.QQSVIP ? f() : window.location.href = A
        }, skipAd: function () {
            function a() {
                var c = b.getUserStatus();
                switch (b.config.$skipLink.attr({href: "javascript:;"}), parseInt(c, 10)) {
                    case I.NOTLOGIN:
                        b.openLogin(function () {
                            a()
                        }), b.player.videoTag.pause();
                        break;
                    case I.HLWVIP:
                        1 == w.adFlag ? (w.config.$copyrightTips && w.config.$copyrightTips.removeClass(H), w.config.$container.addClass("tvp_ads_ontop"), b.player.videoTag.pause()) : f();
                        break;
                    case I.QQVIP:
                    case I.QQSVIP:
                        1 == w.adFlag ? (w.config.$copyrightTips && w.config.$copyrightTips.removeClass(H), w.config.$container.addClass("tvp_ads_ontop"), b.player.videoTag.pause()) : 2 === w.player.config.type && b.player.getCurTime() >= G ? b.next() : b.player.videoTag.play();
                        break;
                    default:
                        b.player.videoTag.pause(), b.config.$skipLink.attr({href: z})
                }
            }

            var b = this;
            b.isLogin() ? a() : (b.openLogin(function () {
                a()
            }), b.player.videoTag.pause())
        }
    }
}(tvp, tvp.$);