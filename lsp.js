// ==UserScript==
// @name         绿色产业链通杀脚本
// @namespace    ios151原yuheng
// @version      1.0
// @description  处理多个网站的请求
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let scriptName = "绿色产业链通杀脚本"
        , $ = new Env(scriptName)
        , CryptoJS = void 0
        , { body } = $response
        , obj = JSON.parse(body)
        , { url } = $request
        , domainReg = new RegExp(/^(http[s]?:\/\/)([^\/]+)/g)
        , domain = domainReg.exec(url)[0]

    // 加载CryptoJS
    loadCryptoJS();

    switch (true) {
        // 50度灰/他趣
        case /(50|xtt)/.test(domain):
            handle50DHAndTQ();
            break;
        // 91短视频
        case /(yiqiapi|jiujiao|myb[0-9]+api)/.test(domain):
            handle91DSP();
            break;
        // 汤头条
        case /tbr/.test(domain):
            handleTTT();
            break;
        // 撸先生
        case /hichat/.test(domain):
            handleLXS();
            break;
        // 微密圈
        case /wmq/.test(domain):
            handleWMQ();
            break;
        // 小蓝视频
        case /gvlan/.test(domain):
            handleXLSP();
            break;
        // 91AV(接口需验证token故弹窗通知)
        case /i91av/.test(domain):
            handle91AV();
            break;
        case /ksapi/.test(domain):
            handleKS();
            break;
        default:
            $done();
            break;
    }

    function handle50DHAndTQ() {
        $.log('', '🔔50度灰', '')
        const p = CryptoJS.enc.Utf8.parse('7205a6c3883caf95b52db5b534e12ec3');
        const d = CryptoJS.enc.Utf8.parse('81d7beac44a86f43');
        function Encrypt(data) {
            const jsonData = JSON.stringify(data);
            const encryptedData = CryptoJS.AES.encrypt(jsonData, p, {
                iv: d,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            });
            const base64EncryptedData = encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
            const hexEncryptedData = CryptoJS.enc.Base64.parse(base64EncryptedData).toString(CryptoJS.enc.Hex);
            return hexEncryptedData.toUpperCase();
        }
        let decryptData = JSON.parse(commonDecrypt(obj.data, p, d));
        if (/system\/getad/.test($request.url)) {
            decryptData.data = []
            obj.data = Encrypt(JSON.stringify(decryptData))
        }
        if (/home\/appcenter/.test($request.url)) {
            decryptData.data.banner = [];
            obj.data = Encrypt(JSON.stringify(decryptData))
        }
        if (/home\/getOpenAdsAndVersion/.test($request.url)) {
            decryptData.data.ads = {}
            decryptData.data.pop_ads = []
            obj.data = Encrypt(JSON.stringify(decryptData))
        }
        // 个人信息
        if (/\/user\/userinfo/.test($request.url)) {
            decryptData.isVip = true;
            decryptData.daily_view = 999;
            obj.data = Encrypt(JSON.stringify({
                ...decryptData,
                data: {
                    ...decryptData.data,
                    nickname: 'lovebabyforever',
                    followed: 999,
                    fabulous_count: 999,
                    videos_count: 999,
                    vip: true,
                    free_view_cnt: 999,
                    coins: 999
                }
            }))
        }
        // 短视频
        if (/MvDetail\/xiao_detail/.test($request.url)) {
            decryptData.data.detail.preview_video = decryptData.data.detail.preview_video.replace(/h5play/, 'long').replace(/10s/, 'long');
            decryptData.data.detail.is_pay = true
            decryptData.data.detail.status = 2
            decryptData.isVip = true;
            obj.data = Encrypt(JSON.stringify(decryptData))
        }
        // 解锁视频
        if (/\/MvDetail\/(detail)/.test($request.url)) {
            decryptData.isVip = true;
            decryptData.daily_view = 999;
            const unLockUrl = decryptData.data.detail.preview_video
                .replace(/h5play/, 'long')
                .replace(/10s/, 'long');
            obj.data = Encrypt(JSON.stringify({
                ...decryptData,
                data: {
                    ...decryptData.data,
                    detail: {
                        ...decryptData.data.detail,
                        is_pay: true,
                        source_240: unLockUrl,
                        preview_video: unLockUrl,
                        preview_tip: '已为LSP解锁成功'
                    },
                    banner: [],
                }
            }))
        }
        $done({ body: JSON.stringify(obj) })
    }

    // 定义其他处理函数，根据需要

})();
(function() {
    'use strict';

    function handle91DSP() {
        $.log('', '🔔91短视频', '')
        let d = CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)][String.fromCharCode(85) + String.fromCharCode(116) + String.fromCharCode(102) + String.fromCharCode(56)]["".concat(String.fromCharCode(112), "arse")]("99_99_56_56_100_100_99_57_51_53_55_102_102_52_54_49_101_48_56_102_48_52_55_97_101_100_101_101_54_57_50_98".split("_").map((function (e) { return String.fromCharCode(parseInt(e)) })).join(""))
            , f = CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)][String.fromCharCode(85) + String.fromCharCode(116) + String.fromCharCode(102) + String.fromCharCode(56)]["".concat(String.fromCharCode(112), "arse")]("101_56_57_50_50_53_99_102_98_98_105_109_103_107_99_117".split("_").map((function (e) {
                return String.fromCharCode(parseInt(e))
            })).join(""))
            , decryptData = Decrypt(obj.data, d, f);
        function Decrypt(e) {
            try {
                var t = CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)]["72_101_120".split("_").map((function (e) {
                    return String.fromCharCode(parseInt(e))
                }
                )).join("")]["".concat(String.fromCharCode(112), "arse")](e)
                    , n = CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)]["66_97_115_101_54_52".split("_").map((function (e) {
                        return String.fromCharCode(parseInt(e))
                    }
                    )).join("")].stringify(t)
                    , r = CryptoJS[String.fromCharCode(65) + String.fromCharCode(69) + String.fromCharCode(83)]["100_101_99_114_121_112_116".split("_").map((function (e) {
                        return String.fromCharCode(parseInt(e))
                    }
                    )).join("")](n, d, {
                        iv: f,
                        mode: CryptoJS["109_111_100_101".split("_").map((function (e) {
                            return String.fromCharCode(parseInt(e))
                        }
                        )).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                        padding: CryptoJS["".concat(String.fromCharCode(112), "ad")]["".concat(String.fromCharCode(78), "o").concat(String.fromCharCode(80), "adding")]
                    }).toString(CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)][String.fromCharCode(85) + String.fromCharCode(116) + String.fromCharCode(102) + String.fromCharCode(56)]);
                return JSON["".concat(String.fromCharCode(112), "arse")](r.toString())
            } catch (e) {
                return ""
            }
        }
        function Encrypt(e) {
            var t = CryptoJS[String.fromCharCode(101) + String.fromCharCode(110) + String.fromCharCode(99)][String.fromCharCode(85) + String.fromCharCode(116) + String.fromCharCode(102) + String.fromCharCode(56)]["".concat(String.fromCharCode(112), "arse")](e)
                , n = CryptoJS[String.fromCharCode(65) + String.fromCharCode(69) + String.fromCharCode(83)]["101_110_99_114_121_112_116".split("_").map((function (e) {
                    return String.fromCharCode(parseInt(e))
                }
                )).join("")](t, d, {
                    iv: f,
                    mode: CryptoJS["109_111_100_101".split("_").map((function (e) {
                        return String.fromCharCode(parseInt(e))
                    }
                    )).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                    padding: CryptoJS["".concat(String.fromCharCode(112), "ad")]["".concat(String.fromCharCode(78), "o").concat(String.fromCharCode(80), "adding")]
                })["99_105_112_104_101_114_116_101_120_116".split("_").map((function (e) {
                    return String.fromCharCode(parseInt(e))
                }
                )).join("")].toString()["116_111_85_112_112_101_114_67_97_115_101".split("_").map((function (e) {
                    return String.fromCharCode(parseInt(e))
                }
                )).join("")]()
            return n
        }
        // 个人信息修改
        if (decryptData?.data?.info) {
            const info = {
                ...decryptData.data.info,
                username: '13888888888',
                phone: '13888888888',
                nickname: 'lovebabyforever',
                topbanner: [],
                invitedNum: 999,
                isVip: true,
                watchCount: 999,
                watchStr: '无限',
                city: 'M78',
                canWatchCount: '999',
                coins: 999999,
                fans: '999',
                followed: '999',
                fabulous: '999',
                videosCount: '999',
                vip_level: 6,
                buy_count: 999,
                age: 18,
                exp: 4084941654,
                level: 99,
                coins_expired: 4084941654,
                coins_free: true,
            }
            decryptData.data.info = info;
            decryptData.isVip = true;
        }
        // 解锁短视频
        if (decryptData?.data?.recommendedData?.length) {
            decryptData.data.isVip = true
            decryptData.data.vip_level = 4
            decryptData.data.pop_ads = []
            decryptData.data.recommendedData = decryptData.data.recommendedData.map(item => {
                return {
                    ...item,
                    playUrl: item.playUrl.replace(/10play/, 'long').replace(/h5play/, 'long').replace(/\?.*/, ''),
                    hasBuy: true,
                }
            });
        }
        // 视频解锁 
        if (decryptData?.data?.playUrl || decryptData?.data?.previewUrl) {
            let playUrl = decryptData.data.playUrl || decryptData.data.previewUrl;
        playUrl = playUrl.replace(/10play/, 'long').replace(/h5play/, 'long').replace(/\?.*/, '');
        decryptData?.data?.playUrl ? decryptData.data.playUrl = playUrl : decryptData.data.previewUrl = playUrl;
    }
    // 去广告
    if (decryptData?.data?.banner) {
        decryptData.data.banner = [];
    }
    obj.data = Encrypt(JSON.stringify(decryptData), d, f);
    $done({ body: JSON.stringify(obj) });
})();
(function () {
    'use strict';

    const d = CryptoJS.enc.Utf8.parse('f9508757cfbbimgkcuujsoimcuu4abccbfbcbfaa7');
    const f = CryptoJS.enc.Utf8.parse('f9508757cfbbimg');
    const s = CryptoJS.enc.Utf8.parse('f59d754df5535148');
    const m = CryptoJS.enc.Utf8.parse('978b60397abc2fbeb1');
    const p = '8DH2lusi4W6uhqFjNbCkuNdosdfghjH';

    const CryptData = {
        Decrypt: function (data) {
            try {
                const t = CryptoJS.enc.Base64.parse(data);
                const n = CryptoJS.AES.decrypt(t, d, {
                    iv: f,
                    mode: CryptoJS.mode.CFB,
                    padding: CryptoJS.pad.NoPadding
                }).toString(CryptoJS.enc.Utf8);
                return JSON.parse(n);
            } catch (e) {
                return "";
            }
        },
        Encrypt: function (data) {
            const t = CryptoJS.enc.Utf8.parse(data);
            const n = CryptoJS.AES.encrypt(t, d, {
                iv: f,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            }).ciphertext.toString(CryptoJS.enc.Base64);
            return n;
        }
    };

    const decryptData = CryptData.Decrypt(obj.data);
    const { status: successStatus, data } = decryptData;
    if (+successStatus !== 200) {
        $done();
        return;
    }

    // 去广告
    if (data?.advert?.length) {
        decryptData.data.advert = [];
    }
    if (data?.advert_lable?.length) {
        decryptData.data.advert_lable = [];
    }
    if (data?.alert_ad) {
        decryptData.data.alert_ad.url = 'https://github.com/Yu9191';
    }
    if (data?.openAds) {
        decryptData.data.openAds = {};
    }
    if (Array.isArray(data)) {
        $done();
        return;
    }

    // 个人信息修改
    if (data.hasOwnProperty('oauth_id') && data.hasOwnProperty('oauth_type') && data.hasOwnProperty('uid')) {
        decryptData.data.username = 'lovebabyforever';
        decryptData.data.expired_at = 4085561456;
        decryptData.data.vip_notice = 1;
        decryptData.data.balance = 99999;
        decryptData.data.privilege_num = 99;
        decryptData.data.score = 99999;
        decryptData.data.left_num = 999;
        decryptData.data.have_num = 999;
        decryptData.data.validate = 1;
        decryptData.data.group_url = "https://t.me/ios151";
        obj.data = CryptData.Encrypt(JSON.stringify(decryptData));
        $done({ body: JSON.stringify(obj) });
        return;
    }

    if (!data.hasOwnProperty('v_ext')) {
        $done();
        return;
    }

    // 解锁付费
    if (+decryptData?.data?.is_pay === 0) {
        decryptData.data.is_pay = 1;
    }

    // 解锁会员线路（实则无屌用所有线路均一个地址）
    if (decryptData?.line?.length) {
        decryptData.line = decryptData.line.map(item => {
            return {
                ...item,
                info: {
                    ...item.info,
                    can_change: {
                        "yes_no": 1,
                        "msg": ""
                    }
                }
            }
        });
    }

    // 解锁付费/VIP视频
    if (data.hasOwnProperty('privilege')) {
        decryptData.data.privilege.can_change_look.yes_no = 1;
        decryptData.data.privilege.can_change_look.msg = '';
        decryptData.data.privilege.can_change_video.yes_no = 1;
        decryptData.data.privilege.can_change_video.msg = '';
    }

    obj.data = CryptData.Encrypt(JSON.stringify(decryptData));
    $done({ body: JSON.stringify(obj) });
})();
(function () {
    'use strict';

    const d = CryptoJS.enc.Utf8.parse("7205a6c3883caf95b52db5b534e12ec3");
    const s = CryptoJS.enc.Utf8.parse("81d7beac44a86f43");

    const CryptoData = {
        Decrypt: function (n) {
            var t = CryptoJS.enc.Hex.parse(n);
            var r = CryptoJS.enc.Base64.stringify(t);
            var o = CryptoJS.AES.decrypt(r, d, {
                iv: s,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            }).toString(CryptoJS.enc.Utf8);
            return JSON.parse(o.toString());
        },
        Encrypt: function (n) {
            var t = CryptoJS.enc.Utf8.parse(n);
            var r = CryptoJS.AES.encrypt(t, d, {
                iv: s,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            }).ciphertext.toString(CryptoJS.enc.Base64);
            return r;
        }
    };

    let decryptData = CryptoData.Decrypt(obj.data);

    if (/home\/getOpenAdsAndVersion/.test($request.url)) {
        decryptData.data.ads = {};
        decryptData.data.pop_ads = [];
        obj.data = CryptoData.Encrypt(JSON.stringify(decryptData));
    } else if (/\/user\/userinfo/.test($request.url)) {
        decryptData.isVip = true;
        decryptData.daily_view = 999;
        obj.data = CryptoData.Encrypt(JSON.stringify({
            ...decryptData,
            data: {
                ...decryptData.data,
                nickname: 'lovebabyforever',
                followed: 999,
                fabulous_count: 999,
                videos_count: 999,
                vip: true,
                free_view_cnt: 999,
                coins: 999
            }
        }));
    }

    if (/\/MvDetail\/detail/.test($request.url)) {
        decryptData.isVip = true;
        decryptData.daily_view = 999;
        const unLockUrl = decryptData.data.detail.preview_video.replace(/h5play/, 'long');
        obj.data = CryptoData.Encrypt(JSON.stringify({
            ...decryptData,
            data: {
                ...decryptData.data,
                detail: {
                    ...decryptData.data.detail,
                    is_pay: true,
                    preview_video: unLockUrl,
                    preview_tip: '已为LSP解锁成功'
                },
                banner: [],
            }
        }));
    }

    $done({ body: JSON.stringify(obj) });
})();
(function () {
    'use strict';

    const d = CryptoJS.enc.Utf8.parse("cc88ddc9357ff461e08f047aedee692b");
    const f = CryptoJS.enc.Utf8.parse("e89225cfbbimgkcu");

    function Encrypt(e) {
        var t = CryptoJS.enc.Utf8.parse(e);
        var n = CryptoJS.AES.encrypt(t, d, {
            iv: f,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.NoPadding
        }).ciphertext.toString().toUpperCase();
        var r = (new Date).getTime() / 1e3;
        var o = parseInt(r.toString());
        return n;
    }

    function Decrypt(e) {
        var t = CryptoJS.enc.Hex.parse(e);
        var n = CryptoJS.enc.Base64.stringify(t);
        var r = CryptoJS.AES.decrypt(n, d, {
            iv: f,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.NoPadding
        }).toString(CryptoJS.enc.Utf8);
        return JSON.parse(r.toString());
    }

    const res = Decrypt(obj.data);

    if (res?.data?.pop_ads?.length > 0) {
        res.data.popupWindowAds = {};
        res.data.isVip = true;
        res.data.vip_level = 6;
        res.data.pop_ads = [];
        obj.data = Encrypt(JSON.stringify(res));
        $done({ body: JSON.stringify(obj) });
    } else if (res?.data?.info) {
        const info = {
            ...res.data.info,
            username: '13888888888',
            phone: '13888888888',
            nickname: 'lovebabyforever',
            invitedNum: 999,
            isVip: true,
            watchCount: 999,
            watchStr: '无限',
            city: 'M78',
            canWatchCount: '999',
            coins: 999999,
            fans: '999',
            followed: '999',
            fabulous: '999',
            videosCount: '999',
            vip_level: 4,
            buy_count: 999,
            age: 18,
            exp: 4084941654,
            level: 10,
            coins_expired: 4084941654,
            coins_free: true,
        };
        res.data.info = info;
        res.isVip = true;
        const encryptStr = Encrypt(JSON.stringify(res));
        obj.data = encryptStr;
        $done({ body: JSON.stringify(obj) });
    } else if (res?.data?.playUrl || res?.data?.previewUrl) {
        let playUrl = res.data.playUrl || res.data.previewUrl;
        playUrl = playUrl.replace('10play', 'long').replace(/\?.*/, '');
        res?.data?.playUrl ? res.data.playUrl = playUrl : res.data.previewUrl = playUrl;
        const encryptStr = Encrypt(JSON.stringify(res));
        obj.data = encryptStr;
        $done({ body: JSON.stringify(obj) });
    } else if (res?.data?.banner) {
        res.data.banner = [];
        const encryptStr = Encrypt(JSON.stringify(res));
        obj.data = encryptStr;
        $done({ body: JSON.stringify(obj) });
    } else {
        $done();
    }
})();
(function () {
    'use strict';

    const p = CryptoJS.enc.Utf8.parse("99_99_56_56_100_100_99_57_51_53_55_102_102_52_54_49_101_48_56_102_48_52_55_97_101_100_101_101_54_57_50_98".split("_").map((function (n) {
        return String.fromCharCode(parseInt(n));
    })).join(""));
    const s = CryptoJS.enc.Utf8.parse("101_56_57_50_50_53_99_102_98_98_105_109_103_107_99_117".split("_").map((function (n) {
        return String.fromCharCode(parseInt(n));
    })).join(""));

    const CryptoData = {
        Decrypt: function (n) {
            var t = CryptoJS.enc["72_101_120".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")].parse(n);
            var r = CryptoJS.enc["66_97_115_101_54_52".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")].stringify(t);
            var o = CryptoJS.AES["100_101_99_114_121_112_116".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")](r, p, {
                iv: s,
                mode: CryptoJS["109_111_100_101".split("_").map((function (n) {
                    return String.fromCharCode(parseInt(n));
                })).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                padding: CryptoJS.pad.NoPadding
            }).toString(CryptoJS.enc.Utf8);
            return JSON.parse(o.toString());
        },
        Encrypt: function (n) {
            var t = CryptoJS.enc.Utf8.parse(n);
            var r = CryptoJS.AES["101_110_99_114_121_112_116".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")](t, p, {
                iv: s,
                mode: CryptoJS["109_111_100_101".split("_").map((function (n) {
                    return String.fromCharCode(parseInt(n));
                })).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                padding: CryptoJS.pad.NoPadding
            })["99_105_112_104_101_114_116_101_120_116".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")].toString()["116_111_85_112_112_101_114_67_97_115_101".split("_").map((function (n) {
                return String.fromCharCode(parseInt(n));
            })).join("")]();
            var o = (new Date).getTime() / 1e3;
            var i = parseInt(o.toString());
            return r;
        }
    };

    let decryptData = CryptoData.Decrypt(obj.data);

    if (/getConfig/.test($request.url)) {
        decryptData.data.pop_ads_v2 = [];
    }

    if (/listOfFeature/.test($request.url)) {
        decryptData.data.ads = [];
    }

    if (/getBaseInfo/.test($request.url)) {
        decryptData.data = {
            ...decryptData.data,
            nickname: 'lovebabyforever',
            vip_level: 4,
            videos_count: 999,
            live_count: 999,
            level: 99,
            is_vip: 1,
            vvLevel: 99,
            watch_count: 999,
            can_watch: 999,
            auth_level: 5,
            auth_status: 1,
            expired_str: '永久',
            coins_total: 999,
            fans_count: 999,
            followed_count: 999,
            likes_count: 999
        };
    }

    if (/mv\/detail/.test($request.url)) {
        decryptData.data = {
            ...decryptData.data,
            preview_video: decryptData.data.preview_video.replace(/.*play/, 'long'),
            is_pay: 1,
            preview_tip: 'lovebabyforever已为你解锁',
            status: 1
        };
    }

    if (/(manhua|story)\/detail/.test($request.url)) {
        decryptData.data = {
            ...decryptData.data,
            is_pay: 1,
            is_free: 1,
            status: 1
        };
    }

    obj.data = CryptoData.Encrypt(JSON.stringify(decryptData));
    $done({ body: JSON.stringify(obj) });
})();
(function () {
    'use strict';

    const s = CryptoJS.enc.Utf8.parse("99_99_56_56_100_100_99_57_51_53_55_102_102_52_54_49_101_48_56_102_48_52_55_97_101_100_101_101_54_57_50_98".split("_").map((function (t) {
        return String.fromCharCode(parseInt(t));
    })).join(""));
    const m = CryptoJS.enc.Utf8.parse("101_56_57_50_50_53_99_102_98_98_105_109_103_107_99_117".split("_").map((function (t) {
        return String.fromCharCode(parseInt(t));
    })).join(""));

    const CryptoData = {
        Decrypt: function (t) {
            var r = CryptoJS.enc["72_101_120".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")].parse(t);
            var e = CryptoJS.enc["66_97_115_101_54_52".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")].stringify(r);
            var n = CryptoJS.AES["100_101_99_114_121_112_116".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")](e, s, {
                iv: m,
                mode: CryptoJS["109_111_100_101".split("_").map((function (t) {
                    return String.fromCharCode(parseInt(t));
                })).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                padding: CryptoJS.pad.NoPadding
            }).toString(CryptoJS.enc.Utf8);
            return JSON.parse(n.toString());
        },
        Encrypt: function (t) {
            var r = CryptoJS.enc.Utf8.parse(t);
            var e = CryptoJS.AES["101_110_99_114_121_112_116".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")](r, s, {
                iv: m,
                mode: CryptoJS["109_111_100_101".split("_").map((function (t) {
                    return String.fromCharCode(parseInt(t));
                })).join("")][String.fromCharCode(67) + String.fromCharCode(70) + String.fromCharCode(66)],
                padding: CryptoJS.pad.NoPadding
            })["99_105_112_104_101_114_116_101_120_116".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")].toString()["116_111_85_112_112_101_114_67_97_115_101".split("_").map((function (t) {
                return String.fromCharCode(parseInt(t));
            })).join("")]();
            var n = (new Date).getTime() / 1e3;
            var a = parseInt(n.toString());
            return e;
        }
    };

    let M3U8URL = '';
    try {
        let decryptData = CryptoData.Decrypt(obj.data);
        console.log(JSON.stringify(decryptData, null, 2))
        if (decryptData?.data) {
            decryptData.isVip = true, decryptData.needLogin = false;
            let { data } = decryptData
            data.hasOwnProperty('isVip') && (data.isVip = true)
            data.hasOwnProperty('vip_level') && (data.vip_level = 4)
            data?.pop_ads?.length > 0 && (data.pop_ads = [])
            data?.pop_window && (data.pop_window = {})
            // 个人中心
            if (data?.info) {
                let { info } = data;
                info?.banner?.length > 0 && (info.banner = [])
                info.hasOwnProperty('isVip') && (info.isVip = true)
                info.hasOwnProperty('hasWatchCount') && (info.hasWatchCount = 999)
                info.hasOwnProperty('canWatchCount') && (info.canWatchCount = 999)
                info.hasOwnProperty('isLogin') && (info.isLogin = true)
                info.hasOwnProperty('vip_level') && (info.vip_level = 4)
                info.hasOwnProperty('phone') && (info.phone = 13888888888)
                info.hasOwnProperty('nickname') && (info.nickname = 'lovebabyforever')
                info.hasOwnProperty('level') && (info.level = 2)
                info.hasOwnProperty('ads') && (info.ads = {})
                info.hasOwnProperty('free_times') && (info.free_times = 999)
                data.info = info;
            }
            // 解锁视频
            if (data.hasOwnProperty('v_ext')) {
                M3U8URL = data.previewUrl.replace(/\d+play/, 'long');
                data = {
                    ...data,
                    hasBuy: true,
                    previewUrl: data.previewUrl.replace(/\d+play/, 'long'),
                    bottom_banner: [],
                };
                $.msg("完整版视频链接已经捕获成功 🛠", "", "点击一下此通知即可在线观看 🔞", M3U8URL);
            }
            data.hasOwnProperty('hasCoins') && (data.can = true, data.msg = 'lovebabyforever为你解锁', data.hasCoins = true);
            decryptData.data = data;

        }
        obj.data = CryptoData.Encrypt(JSON.stringify(decryptData));
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        let err = e || '解密失败';
        $.log('', '❌错误', err, '');
        $done();
    }
})();
function handleKS() {
    $.log('', '🔔快手', '');
    const d = CryptoJS.enc.Utf8.parse("97_97_57_57_100_102_99_57_51_53_55_102_102_52_54_49_101_48_56_102_48_52_55_97_101_100_101_101_54_57_50_98".split("_").map((function (t) {
        return String.fromCharCode(parseInt(t));
    })).join(""));
    
    const s = CryptoJS.enc.Utf8.parse("107_56_57_48_50_53_99_102_102_121_105_109_103_107_99_117".split("_").map((function (t) {
        return String.fromCharCode(parseInt(t));
    })).join(""));
    
    try {
        let decryptData = commonDecrypt(obj.data, d, s);
        if (/getConfig/.test($request.url)) {
            decryptData.data.pop_ads_v2 = [];
        }
        if (/listOfFeature/.test($request.url)) {
            decryptData.data.ads = [];
        }
        if (/getBaseInfo/.test($request.url)) {
            decryptData.data = {
                ...decryptData.data,
                nickname: 'lovebabyforever',
                vip_level: 4,
                videos_count: 999,
                live_count: 999,
                level: 99,
                is_vip: 1,
                isVV: 1,
                vvLevel: 99,
                topNav: [],
                leftNav: [],
                watch_count: 999,
                can_watch: 999,
                auth_level: 5,
                auth_status: 1,
                expiredStr: '永久',
                coins_total: 999,
                fans_count: 999,
                followed_count: 999,
                likes_count: 999,
            };
        }
        if (/mv\pwa_main/.test($request.url)) {
            decryptData.data.banner = [];
        }
        if (/ChargeVideo\/(upIndex|vipIndex)/.test($request.url)) {
            decryptData.data.ads = [];
        }
        if (/mv\/getFeature/.test($request.url)) {
            decryptData.data = decryptData.data.map(item => {
                return {
                    ...item,
                    playURL: item.playURL.replace(/.*play/, 'long'),
                    hotAds: [],
                    hasBuy: true,
                };
            });
        }
        if (/ChargeVideo\/recommend/.test($request.url)) {
            decryptData.data.list = decryptData.data.list.map(item => {
                return {
                    ...item,
                    playURL: item.playURL.replace(/.*play/, 'long'),
                    hotAds: [],
                    hasBuy: true,
                };
            });
        }
        if (/mv\/detail/.test($request.url)) {
            decryptData.data = {
                ...decryptData.data,
                preview_video: decryptData.data.preview_video.replace(/.*play/, 'long'),
                is_pay: 1,
                preview_tip: 'lovebabyforever已为你解锁',
                status: 1,
            };
        }
        if (/(manhua|story)\/detail/.test($request.url)) {
            decryptData.data = {
                ...decryptData.data,
                is_pay: 1,
                is_free: 1,
                status: 1,
            };
        }
        obj.data = commonEncrypt(JSON.stringify(decryptData), d, s);
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        let err = e || '解密失败';
        $.log('', '❌错误', err, '');
        $done();
    }
}

// 调用处理函数
handleKS();
function commonDecrypt(t, p, d) {
    const n = CryptoJS.enc.Hex.parse(t);
    const r = CryptoJS.enc.Base64.stringify(n);
    const e = CryptoJS.AES.decrypt(r, p, {
        iv: d,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(e.toString());
}

function commonEncrypt(t, p, d) {
    const n = CryptoJS.enc.Utf8.parse(t);
    const r = CryptoJS.AES.encrypt(n, p, {
        iv: d,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    }).ciphertext.toString().toUpperCase();
    return r;
}
// prettier-ignore
function loadCryptoJS() {
    CryptoJS = CryptoJS || function (t, r) { var e; if ("undefined" != typeof window && window.crypto && (e = window.crypto), "undefined" != typeof self && self.crypto && (e = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (e = globalThis.crypto), !e && "undefined" != typeof window && window.msCrypto && (e = window.msCrypto), !e && "undefined" != typeof global && global.crypto && (e = global.crypto), !e && "function" == typeof require) try { e = require("crypto") } catch (t) { } var i = function () { if (e) { if ("function" == typeof e.getRandomValues) try { return e.getRandomValues(new Uint32Array(1))[0] } catch (t) { } if ("function" == typeof e.randomBytes) try { return e.randomBytes(4).readInt32LE() } catch (t) { } } throw new Error("Native crypto module could not be used to get secure random number.") }, n = Object.create || function () { function t() { } return function (r) { var e; return t.prototype = r, e = new t, t.prototype = null, e } }(), o = {}, s = o.lib = {}, a = s.Base = { extend: function (t) { var r = n(this); return t && r.mixIn(t), r.hasOwnProperty("init") && this.init !== r.init || (r.init = function () { r.$super.init.apply(this, arguments) }), r.init.prototype = r, r.$super = this, r }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } }, c = s.WordArray = a.extend({ init: function (t, r) { t = this.words = t || [], this.sigBytes = null != r ? r : 4 * t.length }, toString: function (t) { return (t || l).stringify(this) }, concat: function (t) { var r = this.words, e = t.words, i = this.sigBytes, n = t.sigBytes; if (this.clamp(), i % 4) for (var o = 0; o < n; o++) { var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255; r[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8 } else for (var a = 0; a < n; a += 4)r[i + a >>> 2] = e[a >>> 2]; return this.sigBytes += n, this }, clamp: function () { var r = this.words, e = this.sigBytes; r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, r.length = t.ceil(e / 4) }, clone: function () { var t = a.clone.call(this); return t.words = this.words.slice(0), t }, random: function (t) { for (var r = [], e = 0; e < t; e += 4)r.push(i()); return new c.init(r, t) } }), h = o.enc = {}, l = h.Hex = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i += 2)e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new c.init(e, r / 2) } }, f = h.Latin1 = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i++)e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new c.init(e, r) } }, u = h.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(f.stringify(t))) } catch (t) { throw new Error("Malformed UTF-8 data") } }, parse: function (t) { return f.parse(unescape(encodeURIComponent(t))) } }, d = s.BufferedBlockAlgorithm = a.extend({ reset: function () { this._data = new c.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (r) { var e, i = this._data, n = i.words, o = i.sigBytes, s = this.blockSize, a = o / (4 * s), h = (a = r ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, l = t.min(4 * h, o); if (h) { for (var f = 0; f < h; f += s)this._doProcessBlock(n, f); e = n.splice(0, h), i.sigBytes -= l } return new c.init(e, l) }, clone: function () { var t = a.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }), p = (s.Hasher = d.extend({ cfg: a.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { d.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, blockSize: 16, _createHelper: function (t) { return function (r, e) { return new t.init(e).finalize(r) } }, _createHmacHelper: function (t) { return function (r, e) { return new p.HMAC.init(t, e).finalize(r) } } }), o.algo = {}); return o }(Math); !function (t) { var r = CryptoJS, e = r.lib, i = e.Base, n = e.WordArray, o = r.x64 = {}; o.Word = i.extend({ init: function (t, r) { this.high = t, this.low = r } }), o.WordArray = i.extend({ init: function (t, r) { t = this.words = t || [], this.sigBytes = null != r ? r : 8 * t.length }, toX32: function () { for (var t = this.words, r = t.length, e = [], i = 0; i < r; i++) { var o = t[i]; e.push(o.high), e.push(o.low) } return n.create(e, this.sigBytes) }, clone: function () { for (var t = i.clone.call(this), r = t.words = this.words.slice(0), e = r.length, n = 0; n < e; n++)r[n] = r[n].clone(); return t } }) }(), function () { if ("function" == typeof ArrayBuffer) { var t = CryptoJS.lib.WordArray, r = t.init; (t.init = function (t) { if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) { for (var e = t.byteLength, i = [], n = 0; n < e; n++)i[n >>> 2] |= t[n] << 24 - n % 4 * 8; r.call(this, i, e) } else r.apply(this, arguments) }).prototype = t } }(), function () { var t = CryptoJS, r = t.lib.WordArray, e = t.enc; e.Utf16 = e.Utf16BE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n += 2) { var o = r[n >>> 2] >>> 16 - n % 4 * 8 & 65535; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var e = t.length, i = [], n = 0; n < e; n++)i[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16; return r.create(i, 2 * e) } }; function i(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } e.Utf16LE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, n = [], o = 0; o < e; o += 2) { var s = i(r[o >>> 2] >>> 16 - o % 4 * 8 & 65535); n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (t) { for (var e = t.length, n = [], o = 0; o < e; o++)n[o >>> 1] |= i(t.charCodeAt(o) << 16 - o % 2 * 16); return r.create(n, 2 * e) } } }(), function () { var t = CryptoJS, r = t.lib.WordArray; t.enc.Base64 = { stringify: function (t) { var r = t.words, e = t.sigBytes, i = this._map; t.clamp(); for (var n = [], o = 0; o < e; o += 3)for (var s = (r[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < e; a++)n.push(i.charAt(s >>> 6 * (3 - a) & 63)); var c = i.charAt(64); if (c) for (; n.length % 4;)n.push(c); return n.join("") }, parse: function (t) { var e = t.length, i = this._map, n = this._reverseMap; if (!n) { n = this._reverseMap = []; for (var o = 0; o < i.length; o++)n[i.charCodeAt(o)] = o } var s = i.charAt(64); if (s) { var a = t.indexOf(s); -1 !== a && (e = a) } return function (t, e, i) { for (var n = [], o = 0, s = 0; s < e; s++)if (s % 4) { var a = i[t.charCodeAt(s - 1)] << s % 4 * 2, c = i[t.charCodeAt(s)] >>> 6 - s % 4 * 2, h = a | c; n[o >>> 2] |= h << 24 - o % 4 * 8, o++ } return r.create(n, o) }(t, e, n) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" } }(), function () { var t = CryptoJS, r = t.lib.WordArray; t.enc.Base64url = { stringify: function (t, r = !0) { var e = t.words, i = t.sigBytes, n = r ? this._safe_map : this._map; t.clamp(); for (var o = [], s = 0; s < i; s += 3)for (var a = (e[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (e[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | e[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, c = 0; c < 4 && s + .75 * c < i; c++)o.push(n.charAt(a >>> 6 * (3 - c) & 63)); var h = n.charAt(64); if (h) for (; o.length % 4;)o.push(h); return o.join("") }, parse: function (t, e = !0) { var i = t.length, n = e ? this._safe_map : this._map, o = this._reverseMap; if (!o) { o = this._reverseMap = []; for (var s = 0; s < n.length; s++)o[n.charCodeAt(s)] = s } var a = n.charAt(64); if (a) { var c = t.indexOf(a); -1 !== c && (i = c) } return function (t, e, i) { for (var n = [], o = 0, s = 0; s < e; s++)if (s % 4) { var a = i[t.charCodeAt(s - 1)] << s % 4 * 2, c = i[t.charCodeAt(s)] >>> 6 - s % 4 * 2, h = a | c; n[o >>> 2] |= h << 24 - o % 4 * 8, o++ } return r.create(n, o) }(t, i, o) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" } }(), function (t) { var r = CryptoJS, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.algo, s = []; !function () { for (var r = 0; r < 64; r++)s[r] = 4294967296 * t.abs(t.sin(r + 1)) | 0 }(); var a = o.MD5 = n.extend({ _doReset: function () { this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, r) { for (var e = 0; e < 16; e++) { var i = r + e, n = t[i]; t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8) } var o = this._hash.words, a = t[r + 0], u = t[r + 1], d = t[r + 2], p = t[r + 3], y = t[r + 4], _ = t[r + 5], v = t[r + 6], g = t[r + 7], B = t[r + 8], w = t[r + 9], S = t[r + 10], k = t[r + 11], C = t[r + 12], m = t[r + 13], b = t[r + 14], x = t[r + 15], A = o[0], H = o[1], z = o[2], D = o[3]; H = f(H = f(H = f(H = f(H = l(H = l(H = l(H = l(H = h(H = h(H = h(H = h(H = c(H = c(H = c(H = c(H, z = c(z, D = c(D, A = c(A, H, z, D, a, 7, s[0]), H, z, u, 12, s[1]), A, H, d, 17, s[2]), D, A, p, 22, s[3]), z = c(z, D = c(D, A = c(A, H, z, D, y, 7, s[4]), H, z, _, 12, s[5]), A, H, v, 17, s[6]), D, A, g, 22, s[7]), z = c(z, D = c(D, A = c(A, H, z, D, B, 7, s[8]), H, z, w, 12, s[9]), A, H, S, 17, s[10]), D, A, k, 22, s[11]), z = c(z, D = c(D, A = c(A, H, z, D, C, 7, s[12]), H, z, m, 12, s[13]), A, H, b, 17, s[14]), D, A, x, 22, s[15]), z = h(z, D = h(D, A = h(A, H, z, D, u, 5, s[16]), H, z, v, 9, s[17]), A, H, k, 14, s[18]), D, A, a, 20, s[19]), z = h(z, D = h(D, A = h(A, H, z, D, _, 5, s[20]), H, z, S, 9, s[21]), A, H, x, 14, s[22]), D, A, y, 20, s[23]), z = h(z, D = h(D, A = h(A, H, z, D, w, 5, s[24]), H, z, b, 9, s[25]), A, H, p, 14, s[26]), D, A, B, 20, s[27]), z = h(z, D = h(D, A = h(A, H, z, D, m, 5, s[28]), H, z, d, 9, s[29]), A, H, g, 14, s[30]), D, A, C, 20, s[31]), z = l(z, D = l(D, A = l(A, H, z, D, _, 4, s[32]), H, z, B, 11, s[33]), A, H, k, 16, s[34]), D, A, b, 23, s[35]), z = l(z, D = l(D, A = l(A, H, z, D, u, 4, s[36]), H, z, y, 11, s[37]), A, H, g, 16, s[38]), D, A, S, 23, s[39]), z = l(z, D = l(D, A = l(A, H, z, D, m, 4, s[40]), H, z, a, 11, s[41]), A, H, p, 16, s[42]), D, A, v, 23, s[43]), z = l(z, D = l(D, A = l(A, H, z, D, w, 4, s[44]), H, z, C, 11, s[45]), A, H, x, 16, s[46]), D, A, d, 23, s[47]), z = f(z, D = f(D, A = f(A, H, z, D, a, 6, s[48]), H, z, g, 10, s[49]), A, H, b, 15, s[50]), D, A, _, 21, s[51]), z = f(z, D = f(D, A = f(A, H, z, D, C, 6, s[52]), H, z, p, 10, s[53]), A, H, S, 15, s[54]), D, A, u, 21, s[55]), z = f(z, D = f(D, A = f(A, H, z, D, B, 6, s[56]), H, z, x, 10, s[57]), A, H, v, 15, s[58]), D, A, m, 21, s[59]), z = f(z, D = f(D, A = f(A, H, z, D, y, 6, s[60]), H, z, k, 10, s[61]), A, H, d, 15, s[62]), D, A, w, 21, s[63]), o[0] = o[0] + A | 0, o[1] = o[1] + H | 0, o[2] = o[2] + z | 0, o[3] = o[3] + D | 0 }, _doFinalize: function () { var r = this._data, e = r.words, i = 8 * this._nDataBytes, n = 8 * r.sigBytes; e[n >>> 5] |= 128 << 24 - n % 32; var o = t.floor(i / 4294967296), s = i; e[15 + (n + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e[14 + (n + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), r.sigBytes = 4 * (e.length + 1), this._process(); for (var a = this._hash, c = a.words, h = 0; h < 4; h++) { var l = c[h]; c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8) } return a }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); function c(t, r, e, i, n, o, s) { var a = t + (r & e | ~r & i) + n + s; return (a << o | a >>> 32 - o) + r } function h(t, r, e, i, n, o, s) { var a = t + (r & i | e & ~i) + n + s; return (a << o | a >>> 32 - o) + r } function l(t, r, e, i, n, o, s) { var a = t + (r ^ e ^ i) + n + s; return (a << o | a >>> 32 - o) + r } function f(t, r, e, i, n, o, s) { var a = t + (e ^ (r | ~i)) + n + s; return (a << o | a >>> 32 - o) + r } r.MD5 = n._createHelper(a), r.HmacMD5 = n._createHmacHelper(a) }(Math), function () { var t = CryptoJS, r = t.lib, e = r.WordArray, i = r.Hasher, n = t.algo, o = [], s = n.SHA1 = i.extend({ _doReset: function () { this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], s = e[2], a = e[3], c = e[4], h = 0; h < 80; h++) { if (h < 16) o[h] = 0 | t[r + h]; else { var l = o[h - 3] ^ o[h - 8] ^ o[h - 14] ^ o[h - 16]; o[h] = l << 1 | l >>> 31 } var f = (i << 5 | i >>> 27) + c + o[h]; f += h < 20 ? 1518500249 + (n & s | ~n & a) : h < 40 ? 1859775393 + (n ^ s ^ a) : h < 60 ? (n & s | n & a | s & a) - 1894007588 : (n ^ s ^ a) - 899497514, c = a, a = s, s = n << 30 | n >>> 2, n = i, i = f } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + s | 0, e[3] = e[3] + a | 0, e[4] = e[4] + c | 0 }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; return r[i >>> 5] |= 128 << 24 - i % 32, r[14 + (i + 64 >>> 9 << 4)] = Math.floor(e / 4294967296), r[15 + (i + 64 >>> 9 << 4)] = e, t.sigBytes = 4 * r.length, this._process(), this._hash }, clone: function () { var t = i.clone.call(this); return t._hash = this._hash.clone(), t } }); t.SHA1 = i._createHelper(s), t.HmacSHA1 = i._createHmacHelper(s) }(), function (t) { var r = CryptoJS, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.algo, s = [], a = []; !function () { function r(r) { for (var e = t.sqrt(r), i = 2; i <= e; i++)if (!(r % i)) return !1; return !0 } function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var i = 2, n = 0; n < 64;)r(i) && (n < 8 && (s[n] = e(t.pow(i, .5))), a[n] = e(t.pow(i, 1 / 3)), n++), i++ }(); var c = [], h = o.SHA256 = n.extend({ _doReset: function () { this._hash = new i.init(s.slice(0)) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], h = e[4], l = e[5], f = e[6], u = e[7], d = 0; d < 64; d++) { if (d < 16) c[d] = 0 | t[r + d]; else { var p = c[d - 15], y = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, _ = c[d - 2], v = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10; c[d] = y + c[d - 7] + v + c[d - 16] } var g = i & n ^ i & o ^ n & o, B = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), w = u + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & l ^ ~h & f) + a[d] + c[d]; u = f, f = l, l = h, h = s + w | 0, s = o, o = n, n = i, i = w + (B + g) | 0 } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + s | 0, e[4] = e[4] + h | 0, e[5] = e[5] + l | 0, e[6] = e[6] + f | 0, e[7] = e[7] + u | 0 }, _doFinalize: function () { var r = this._data, e = r.words, i = 8 * this._nDataBytes, n = 8 * r.sigBytes; return e[n >>> 5] |= 128 << 24 - n % 32, e[14 + (n + 64 >>> 9 << 4)] = t.floor(i / 4294967296), e[15 + (n + 64 >>> 9 << 4)] = i, r.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); r.SHA256 = n._createHelper(h), r.HmacSHA256 = n._createHmacHelper(h) }(Math), function () { var t = CryptoJS, r = t.lib.WordArray, e = t.algo, i = e.SHA256, n = e.SHA224 = i.extend({ _doReset: function () { this._hash = new r.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]) }, _doFinalize: function () { var t = i._doFinalize.call(this); return t.sigBytes -= 4, t } }); t.SHA224 = i._createHelper(n), t.HmacSHA224 = i._createHmacHelper(n) }(), function () { var t = CryptoJS, r = t.lib.Hasher, e = t.x64, i = e.Word, n = e.WordArray, o = t.algo; function s() { return i.create.apply(i, arguments) } var a = [s(1116352408, 3609767458), s(1899447441, 602891725), s(3049323471, 3964484399), s(3921009573, 2173295548), s(961987163, 4081628472), s(1508970993, 3053834265), s(2453635748, 2937671579), s(2870763221, 3664609560), s(3624381080, 2734883394), s(310598401, 1164996542), s(607225278, 1323610764), s(1426881987, 3590304994), s(1925078388, 4068182383), s(2162078206, 991336113), s(2614888103, 633803317), s(3248222580, 3479774868), s(3835390401, 2666613458), s(4022224774, 944711139), s(264347078, 2341262773), s(604807628, 2007800933), s(770255983, 1495990901), s(1249150122, 1856431235), s(1555081692, 3175218132), s(1996064986, 2198950837), s(2554220882, 3999719339), s(2821834349, 766784016), s(2952996808, 2566594879), s(3210313671, 3203337956), s(3336571891, 1034457026), s(3584528711, 2466948901), s(113926993, 3758326383), s(338241895, 168717936), s(666307205, 1188179964), s(773529912, 1546045734), s(1294757372, 1522805485), s(1396182291, 2643833823), s(1695183700, 2343527390), s(1986661051, 1014477480), s(2177026350, 1206759142), s(2456956037, 344077627), s(2730485921, 1290863460), s(2820302411, 3158454273), s(3259730800, 3505952657), s(3345764771, 106217008), s(3516065817, 3606008344), s(3600352804, 1432725776), s(4094571909, 1467031594), s(275423344, 851169720), s(430227734, 3100823752), s(506948616, 1363258195), s(659060556, 3750685593), s(883997877, 3785050280), s(958139571, 3318307427), s(1322822218, 3812723403), s(1537002063, 2003034995), s(1747873779, 3602036899), s(1955562222, 1575990012), s(2024104815, 1125592928), s(2227730452, 2716904306), s(2361852424, 442776044), s(2428436474, 593698344), s(2756734187, 3733110249), s(3204031479, 2999351573), s(3329325298, 3815920427), s(3391569614, 3928383900), s(3515267271, 566280711), s(3940187606, 3454069534), s(4118630271, 4000239992), s(116418474, 1914138554), s(174292421, 2731055270), s(289380356, 3203993006), s(460393269, 320620315), s(685471733, 587496836), s(852142971, 1086792851), s(1017036298, 365543100), s(1126000580, 2618297676), s(1288033470, 3409855158), s(1501505948, 4234509866), s(1607167915, 987167468), s(1816402316, 1246189591)], c = []; !function () { for (var t = 0; t < 80; t++)c[t] = s() }(); var h = o.SHA512 = r.extend({ _doReset: function () { this._hash = new n.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], h = e[4], l = e[5], f = e[6], u = e[7], d = i.high, p = i.low, y = n.high, _ = n.low, v = o.high, g = o.low, B = s.high, w = s.low, S = h.high, k = h.low, C = l.high, m = l.low, b = f.high, x = f.low, A = u.high, H = u.low, z = d, D = p, E = y, J = _, R = v, M = g, F = B, P = w, W = S, O = k, I = C, U = m, K = b, X = x, L = A, j = H, T = 0; T < 80; T++) { var N, q, Z = c[T]; if (T < 16) q = Z.high = 0 | t[r + 2 * T], N = Z.low = 0 | t[r + 2 * T + 1]; else { var V = c[T - 15], G = V.high, Q = V.low, Y = (G >>> 1 | Q << 31) ^ (G >>> 8 | Q << 24) ^ G >>> 7, $ = (Q >>> 1 | G << 31) ^ (Q >>> 8 | G << 24) ^ (Q >>> 7 | G << 25), tt = c[T - 2], rt = tt.high, et = tt.low, it = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ rt >>> 6, nt = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ (et >>> 6 | rt << 26), ot = c[T - 7], st = ot.high, at = ot.low, ct = c[T - 16], ht = ct.high, lt = ct.low; q = (q = (q = Y + st + ((N = $ + at) >>> 0 < $ >>> 0 ? 1 : 0)) + it + ((N += nt) >>> 0 < nt >>> 0 ? 1 : 0)) + ht + ((N += lt) >>> 0 < lt >>> 0 ? 1 : 0), Z.high = q, Z.low = N } var ft, ut = W & I ^ ~W & K, dt = O & U ^ ~O & X, pt = z & E ^ z & R ^ E & R, yt = D & J ^ D & M ^ J & M, _t = (z >>> 28 | D << 4) ^ (z << 30 | D >>> 2) ^ (z << 25 | D >>> 7), vt = (D >>> 28 | z << 4) ^ (D << 30 | z >>> 2) ^ (D << 25 | z >>> 7), gt = (W >>> 14 | O << 18) ^ (W >>> 18 | O << 14) ^ (W << 23 | O >>> 9), Bt = (O >>> 14 | W << 18) ^ (O >>> 18 | W << 14) ^ (O << 23 | W >>> 9), wt = a[T], St = wt.high, kt = wt.low, Ct = L + gt + ((ft = j + Bt) >>> 0 < j >>> 0 ? 1 : 0), mt = vt + yt; L = K, j = X, K = I, X = U, I = W, U = O, W = F + (Ct = (Ct = (Ct = Ct + ut + ((ft = ft + dt) >>> 0 < dt >>> 0 ? 1 : 0)) + St + ((ft = ft + kt) >>> 0 < kt >>> 0 ? 1 : 0)) + q + ((ft = ft + N) >>> 0 < N >>> 0 ? 1 : 0)) + ((O = P + ft | 0) >>> 0 < P >>> 0 ? 1 : 0) | 0, F = R, P = M, R = E, M = J, E = z, J = D, z = Ct + (_t + pt + (mt >>> 0 < vt >>> 0 ? 1 : 0)) + ((D = ft + mt | 0) >>> 0 < ft >>> 0 ? 1 : 0) | 0 } p = i.low = p + D, i.high = d + z + (p >>> 0 < D >>> 0 ? 1 : 0), _ = n.low = _ + J, n.high = y + E + (_ >>> 0 < J >>> 0 ? 1 : 0), g = o.low = g + M, o.high = v + R + (g >>> 0 < M >>> 0 ? 1 : 0), w = s.low = w + P, s.high = B + F + (w >>> 0 < P >>> 0 ? 1 : 0), k = h.low = k + O, h.high = S + W + (k >>> 0 < O >>> 0 ? 1 : 0), m = l.low = m + U, l.high = C + I + (m >>> 0 < U >>> 0 ? 1 : 0), x = f.low = x + X, f.high = b + K + (x >>> 0 < X >>> 0 ? 1 : 0), H = u.low = H + j, u.high = A + L + (H >>> 0 < j >>> 0 ? 1 : 0) }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; return r[i >>> 5] |= 128 << 24 - i % 32, r[30 + (i + 128 >>> 10 << 5)] = Math.floor(e / 4294967296), r[31 + (i + 128 >>> 10 << 5)] = e, t.sigBytes = 4 * r.length, this._process(), this._hash.toX32() }, clone: function () { var t = r.clone.call(this); return t._hash = this._hash.clone(), t }, blockSize: 32 }); t.SHA512 = r._createHelper(h), t.HmacSHA512 = r._createHmacHelper(h) }(), function () { var t = CryptoJS, r = t.x64, e = r.Word, i = r.WordArray, n = t.algo, o = n.SHA512, s = n.SHA384 = o.extend({ _doReset: function () { this._hash = new i.init([new e.init(3418070365, 3238371032), new e.init(1654270250, 914150663), new e.init(2438529370, 812702999), new e.init(355462360, 4144912697), new e.init(1731405415, 4290775857), new e.init(2394180231, 1750603025), new e.init(3675008525, 1694076839), new e.init(1203062813, 3204075428)]) }, _doFinalize: function () { var t = o._doFinalize.call(this); return t.sigBytes -= 16, t } }); t.SHA384 = o._createHelper(s), t.HmacSHA384 = o._createHmacHelper(s) }(), function (t) { var r = CryptoJS, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.x64.Word, s = r.algo, a = [], c = [], h = []; !function () { for (var t = 1, r = 0, e = 0; e < 24; e++) { a[t + 5 * r] = (e + 1) * (e + 2) / 2 % 64; var i = (2 * t + 3 * r) % 5; t = r % 5, r = i } for (t = 0; t < 5; t++)for (r = 0; r < 5; r++)c[t + 5 * r] = r + (2 * t + 3 * r) % 5 * 5; for (var n = 1, s = 0; s < 24; s++) { for (var l = 0, f = 0, u = 0; u < 7; u++) { if (1 & n) { var d = (1 << u) - 1; d < 32 ? f ^= 1 << d : l ^= 1 << d - 32 } 128 & n ? n = n << 1 ^ 113 : n <<= 1 } h[s] = o.create(l, f) } }(); var l = []; !function () { for (var t = 0; t < 25; t++)l[t] = o.create() }(); var f = s.SHA3 = n.extend({ cfg: n.cfg.extend({ outputLength: 512 }), _doReset: function () { for (var t = this._state = [], r = 0; r < 25; r++)t[r] = new o.init; this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32 }, _doProcessBlock: function (t, r) { for (var e = this._state, i = this.blockSize / 2, n = 0; n < i; n++) { var o = t[r + 2 * n], s = t[r + 2 * n + 1]; o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), (H = e[n]).high ^= s, H.low ^= o } for (var f = 0; f < 24; f++) { for (var u = 0; u < 5; u++) { for (var d = 0, p = 0, y = 0; y < 5; y++) { d ^= (H = e[u + 5 * y]).high, p ^= H.low } var _ = l[u]; _.high = d, _.low = p } for (u = 0; u < 5; u++) { var v = l[(u + 4) % 5], g = l[(u + 1) % 5], B = g.high, w = g.low; for (d = v.high ^ (B << 1 | w >>> 31), p = v.low ^ (w << 1 | B >>> 31), y = 0; y < 5; y++) { (H = e[u + 5 * y]).high ^= d, H.low ^= p } } for (var S = 1; S < 25; S++) { var k = (H = e[S]).high, C = H.low, m = a[S]; m < 32 ? (d = k << m | C >>> 32 - m, p = C << m | k >>> 32 - m) : (d = C << m - 32 | k >>> 64 - m, p = k << m - 32 | C >>> 64 - m); var b = l[c[S]]; b.high = d, b.low = p } var x = l[0], A = e[0]; x.high = A.high, x.low = A.low; for (u = 0; u < 5; u++)for (y = 0; y < 5; y++) { var H = e[S = u + 5 * y], z = l[S], D = l[(u + 1) % 5 + 5 * y], E = l[(u + 2) % 5 + 5 * y]; H.high = z.high ^ ~D.high & E.high, H.low = z.low ^ ~D.low & E.low } H = e[0]; var J = h[f]; H.high ^= J.high, H.low ^= J.low } }, _doFinalize: function () { var r = this._data, e = r.words, n = (this._nDataBytes, 8 * r.sigBytes), o = 32 * this.blockSize; e[n >>> 5] |= 1 << 24 - n % 32, e[(t.ceil((n + 1) / o) * o >>> 5) - 1] |= 128, r.sigBytes = 4 * e.length, this._process(); for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) { var f = s[l], u = f.high, d = f.low; u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(u) } return new i.init(h, a) }, clone: function () { for (var t = n.clone.call(this), r = t._state = this._state.slice(0), e = 0; e < 25; e++)r[e] = r[e].clone(); return t } }); r.SHA3 = n._createHelper(f), r.HmacSHA3 = n._createHmacHelper(f) }(Math), function (t) { var r = CryptoJS, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.algo, s = i.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), a = i.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), c = i.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), h = i.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), l = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), f = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), u = o.RIPEMD160 = n.extend({ _doReset: function () { this._hash = i.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var e = 0; e < 16; e++) { var i = r + e, n = t[i]; t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8) } var o, u, B, w, S, k, C, m, b, x, A, H = this._hash.words, z = l.words, D = f.words, E = s.words, J = a.words, R = c.words, M = h.words; k = o = H[0], C = u = H[1], m = B = H[2], b = w = H[3], x = S = H[4]; for (e = 0; e < 80; e += 1)A = o + t[r + E[e]] | 0, A += e < 16 ? d(u, B, w) + z[0] : e < 32 ? p(u, B, w) + z[1] : e < 48 ? y(u, B, w) + z[2] : e < 64 ? _(u, B, w) + z[3] : v(u, B, w) + z[4], A = (A = g(A |= 0, R[e])) + S | 0, o = S, S = w, w = g(B, 10), B = u, u = A, A = k + t[r + J[e]] | 0, A += e < 16 ? v(C, m, b) + D[0] : e < 32 ? _(C, m, b) + D[1] : e < 48 ? y(C, m, b) + D[2] : e < 64 ? p(C, m, b) + D[3] : d(C, m, b) + D[4], A = (A = g(A |= 0, M[e])) + x | 0, k = x, x = b, b = g(m, 10), m = C, C = A; A = H[1] + B + b | 0, H[1] = H[2] + w + x | 0, H[2] = H[3] + S + k | 0, H[3] = H[4] + o + C | 0, H[4] = H[0] + u + m | 0, H[0] = A }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; r[i >>> 5] |= 128 << 24 - i % 32, r[14 + (i + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), t.sigBytes = 4 * (r.length + 1), this._process(); for (var n = this._hash, o = n.words, s = 0; s < 5; s++) { var a = o[s]; o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } return n }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); function d(t, r, e) { return t ^ r ^ e } function p(t, r, e) { return t & r | ~t & e } function y(t, r, e) { return (t | ~r) ^ e } function _(t, r, e) { return t & e | r & ~e } function v(t, r, e) { return t ^ (r | ~e) } function g(t, r) { return t << r | t >>> 32 - r } r.RIPEMD160 = n._createHelper(u), r.HmacRIPEMD160 = n._createHmacHelper(u) }(Math), function () { var t = CryptoJS, r = t.lib.Base, e = t.enc.Utf8; t.algo.HMAC = r.extend({ init: function (t, r) { t = this._hasher = new t.init, "string" == typeof r && (r = e.parse(r)); var i = t.blockSize, n = 4 * i; r.sigBytes > n && (r = t.finalize(r)), r.clamp(); for (var o = this._oKey = r.clone(), s = this._iKey = r.clone(), a = o.words, c = s.words, h = 0; h < i; h++)a[h] ^= 1549556828, c[h] ^= 909522486; o.sigBytes = s.sigBytes = n, this.reset() }, reset: function () { var t = this._hasher; t.reset(), t.update(this._iKey) }, update: function (t) { return this._hasher.update(t), this }, finalize: function (t) { var r = this._hasher, e = r.finalize(t); return r.reset(), r.finalize(this._oKey.clone().concat(e)) } }) }(), function () { var t = CryptoJS, r = t.lib, e = r.Base, i = r.WordArray, n = t.algo, o = n.SHA1, s = n.HMAC, a = n.PBKDF2 = e.extend({ cfg: e.extend({ keySize: 4, hasher: o, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e = this.cfg, n = s.create(e.hasher, t), o = i.create(), a = i.create([1]), c = o.words, h = a.words, l = e.keySize, f = e.iterations; c.length < l;) { var u = n.update(r).finalize(a); n.reset(); for (var d = u.words, p = d.length, y = u, _ = 1; _ < f; _++) { y = n.finalize(y), n.reset(); for (var v = y.words, g = 0; g < p; g++)d[g] ^= v[g] } o.concat(u), h[0]++ } return o.sigBytes = 4 * l, o } }); t.PBKDF2 = function (t, r, e) { return a.create(e).compute(t, r) } }(), function () { var t = CryptoJS, r = t.lib, e = r.Base, i = r.WordArray, n = t.algo, o = n.MD5, s = n.EvpKDF = e.extend({ cfg: e.extend({ keySize: 4, hasher: o, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e, n = this.cfg, o = n.hasher.create(), s = i.create(), a = s.words, c = n.keySize, h = n.iterations; a.length < c;) { e && o.update(e), e = o.update(t).finalize(r), o.reset(); for (var l = 1; l < h; l++)e = o.finalize(e), o.reset(); s.concat(e) } return s.sigBytes = 4 * c, s } }); t.EvpKDF = function (t, r, e) { return s.create(e).compute(t, r) } }(), CryptoJS.lib.Cipher || function (t) { var r = CryptoJS, e = r.lib, i = e.Base, n = e.WordArray, o = e.BufferedBlockAlgorithm, s = r.enc, a = (s.Utf8, s.Base64), c = r.algo.EvpKDF, h = e.Cipher = o.extend({ cfg: i.extend(), createEncryptor: function (t, r) { return this.create(this._ENC_XFORM_MODE, t, r) }, createDecryptor: function (t, r) { return this.create(this._DEC_XFORM_MODE, t, r) }, init: function (t, r, e) { this.cfg = this.cfg.extend(e), this._xformMode = t, this._key = r, this.reset() }, reset: function () { o.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () { function t(t) { return "string" == typeof t ? g : _ } return function (r) { return { encrypt: function (e, i, n) { return t(i).encrypt(r, e, i, n) }, decrypt: function (e, i, n) { return t(i).decrypt(r, e, i, n) } } } }() }), l = (e.StreamCipher = h.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }), r.mode = {}), f = e.BlockCipherMode = i.extend({ createEncryptor: function (t, r) { return this.Encryptor.create(t, r) }, createDecryptor: function (t, r) { return this.Decryptor.create(t, r) }, init: function (t, r) { this._cipher = t, this._iv = r } }), u = l.CBC = function () { var r = f.extend(); function e(r, e, i) { var n, o = this._iv; o ? (n = o, this._iv = t) : n = this._prevBlock; for (var s = 0; s < i; s++)r[e + s] ^= n[s] } return r.Encryptor = r.extend({ processBlock: function (t, r) { var i = this._cipher, n = i.blockSize; e.call(this, t, r, n), i.encryptBlock(t, r), this._prevBlock = t.slice(r, r + n) } }), r.Decryptor = r.extend({ processBlock: function (t, r) { var i = this._cipher, n = i.blockSize, o = t.slice(r, r + n); i.decryptBlock(t, r), e.call(this, t, r, n), this._prevBlock = o } }), r }(), d = (r.pad = {}).Pkcs7 = { pad: function (t, r) { for (var e = 4 * r, i = e - t.sigBytes % e, o = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4)s.push(o); var c = n.create(s, i); t.concat(c) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, p = (e.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: u, padding: d }), reset: function () { var t; h.reset.call(this); var r = this.cfg, e = r.iv, i = r.mode; this._xformMode == this._ENC_XFORM_MODE ? t = i.createEncryptor : (t = i.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == t ? this._mode.init(this, e && e.words) : (this._mode = t.call(i, this, e && e.words), this._mode.__creator = t) }, _doProcessBlock: function (t, r) { this._mode.processBlock(t, r) }, _doFinalize: function () { var t, r = this.cfg.padding; return this._xformMode == this._ENC_XFORM_MODE ? (r.pad(this._data, this.blockSize), t = this._process(!0)) : (t = this._process(!0), r.unpad(t)), t }, blockSize: 4 }), e.CipherParams = i.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } })), y = (r.format = {}).OpenSSL = { stringify: function (t) { var r = t.ciphertext, e = t.salt; return (e ? n.create([1398893684, 1701076831]).concat(e).concat(r) : r).toString(a) }, parse: function (t) { var r, e = a.parse(t), i = e.words; return 1398893684 == i[0] && 1701076831 == i[1] && (r = n.create(i.slice(2, 4)), i.splice(0, 4), e.sigBytes -= 16), p.create({ ciphertext: e, salt: r }) } }, _ = e.SerializableCipher = i.extend({ cfg: i.extend({ format: y }), encrypt: function (t, r, e, i) { i = this.cfg.extend(i); var n = t.createEncryptor(e, i), o = n.finalize(r), s = n.cfg; return p.create({ ciphertext: o, key: e, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, r, e, i) { return i = this.cfg.extend(i), r = this._parse(r, i.format), t.createDecryptor(e, i).finalize(r.ciphertext) }, _parse: function (t, r) { return "string" == typeof t ? r.parse(t, this) : t } }), v = (r.kdf = {}).OpenSSL = { execute: function (t, r, e, i) { i || (i = n.random(8)); var o = c.create({ keySize: r + e }).compute(t, i), s = n.create(o.words.slice(r), 4 * e); return o.sigBytes = 4 * r, p.create({ key: o, iv: s, salt: i }) } }, g = e.PasswordBasedCipher = _.extend({ cfg: _.cfg.extend({ kdf: v }), encrypt: function (t, r, e, i) { var n = (i = this.cfg.extend(i)).kdf.execute(e, t.keySize, t.ivSize); i.iv = n.iv; var o = _.encrypt.call(this, t, r, n.key, i); return o.mixIn(n), o }, decrypt: function (t, r, e, i) { i = this.cfg.extend(i), r = this._parse(r, i.format); var n = i.kdf.execute(e, t.keySize, t.ivSize, r.salt); return i.iv = n.iv, _.decrypt.call(this, t, r, n.key, i) } }) }(), CryptoJS.mode.CFB = function () { var t = CryptoJS.lib.BlockCipherMode.extend(); function r(t, r, e, i) { var n, o = this._iv; o ? (n = o.slice(0), this._iv = void 0) : n = this._prevBlock, i.encryptBlock(n, 0); for (var s = 0; s < e; s++)t[r + s] ^= n[s] } return t.Encryptor = t.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize; r.call(this, t, e, n, i), this._prevBlock = t.slice(e, e + n) } }), t.Decryptor = t.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize, o = t.slice(e, e + n); r.call(this, t, e, n, i), this._prevBlock = o } }), t }(), CryptoJS.mode.CTR = function () { var t = CryptoJS.lib.BlockCipherMode.extend(), r = t.Encryptor = t.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0); var s = o.slice(0); e.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0; for (var a = 0; a < i; a++)t[r + a] ^= s[a] } }); return t.Decryptor = r, t }(), CryptoJS.mode.CTRGladman = function () { var t = CryptoJS.lib.BlockCipherMode.extend(); function r(t) { if (255 == (t >> 24 & 255)) { var r = t >> 16 & 255, e = t >> 8 & 255, i = 255 & t; 255 === r ? (r = 0, 255 === e ? (e = 0, 255 === i ? i = 0 : ++i) : ++e) : ++r, t = 0, t += r << 16, t += e << 8, t += i } else t += 1 << 24; return t } var e = t.Encryptor = t.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize, o = this._iv, s = this._counter; o && (s = this._counter = o.slice(0), this._iv = void 0), function (t) { 0 === (t[0] = r(t[0])) && (t[1] = r(t[1])) }(s); var a = s.slice(0); i.encryptBlock(a, 0); for (var c = 0; c < n; c++)t[e + c] ^= a[c] } }); return t.Decryptor = e, t }(), CryptoJS.mode.OFB = function () { var t = CryptoJS.lib.BlockCipherMode.extend(), r = t.Encryptor = t.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._keystream; n && (o = this._keystream = n.slice(0), this._iv = void 0), e.encryptBlock(o, 0); for (var s = 0; s < i; s++)t[r + s] ^= o[s] } }); return t.Decryptor = r, t }(), CryptoJS.mode.ECB = function () { var t = CryptoJS.lib.BlockCipherMode.extend(); return t.Encryptor = t.extend({ processBlock: function (t, r) { this._cipher.encryptBlock(t, r) } }), t.Decryptor = t.extend({ processBlock: function (t, r) { this._cipher.decryptBlock(t, r) } }), t }(), CryptoJS.pad.AnsiX923 = { pad: function (t, r) { var e = t.sigBytes, i = 4 * r, n = i - e % i, o = e + n - 1; t.clamp(), t.words[o >>> 2] |= n << 24 - o % 4 * 8, t.sigBytes += n }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, CryptoJS.pad.Iso10126 = { pad: function (t, r) { var e = 4 * r, i = e - t.sigBytes % e; t.concat(CryptoJS.lib.WordArray.random(i - 1)).concat(CryptoJS.lib.WordArray.create([i << 24], 1)) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, CryptoJS.pad.Iso97971 = { pad: function (t, r) { t.concat(CryptoJS.lib.WordArray.create([2147483648], 1)), CryptoJS.pad.ZeroPadding.pad(t, r) }, unpad: function (t) { CryptoJS.pad.ZeroPadding.unpad(t), t.sigBytes-- } }, CryptoJS.pad.ZeroPadding = { pad: function (t, r) { var e = 4 * r; t.clamp(), t.sigBytes += e - (t.sigBytes % e || e) }, unpad: function (t) { var r = t.words, e = t.sigBytes - 1; for (e = t.sigBytes - 1; e >= 0; e--)if (r[e >>> 2] >>> 24 - e % 4 * 8 & 255) { t.sigBytes = e + 1; break } } }, CryptoJS.pad.NoPadding = { pad: function () { }, unpad: function () { } }, function (t) { var r = CryptoJS, e = r.lib.CipherParams, i = r.enc.Hex; r.format.Hex = { stringify: function (t) { return t.ciphertext.toString(i) }, parse: function (t) { var r = i.parse(t); return e.create({ ciphertext: r }) } } }(), function () { var t = CryptoJS, r = t.lib.BlockCipher, e = t.algo, i = [], n = [], o = [], s = [], a = [], c = [], h = [], l = [], f = [], u = []; !function () { for (var t = [], r = 0; r < 256; r++)t[r] = r < 128 ? r << 1 : r << 1 ^ 283; var e = 0, d = 0; for (r = 0; r < 256; r++) { var p = d ^ d << 1 ^ d << 2 ^ d << 3 ^ d << 4; p = p >>> 8 ^ 255 & p ^ 99, i[e] = p, n[p] = e; var y = t[e], _ = t[y], v = t[_], g = 257 * t[p] ^ 16843008 * p; o[e] = g << 24 | g >>> 8, s[e] = g << 16 | g >>> 16, a[e] = g << 8 | g >>> 24, c[e] = g; g = 16843009 * v ^ 65537 * _ ^ 257 * y ^ 16843008 * e; h[p] = g << 24 | g >>> 8, l[p] = g << 16 | g >>> 16, f[p] = g << 8 | g >>> 24, u[p] = g, e ? (e = y ^ t[t[t[v ^ y]]], d ^= t[t[d]]) : e = d = 1 } }(); var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], p = e.AES = r.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, n = 4 * ((this._nRounds = e + 6) + 1), o = this._keySchedule = [], s = 0; s < n; s++)s < e ? o[s] = r[s] : (p = o[s - 1], s % e ? e > 6 && s % e == 4 && (p = i[p >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & p]) : (p = i[(p = p << 8 | p >>> 24) >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & p], p ^= d[s / e | 0] << 24), o[s] = o[s - e] ^ p); for (var a = this._invKeySchedule = [], c = 0; c < n; c++) { s = n - c; if (c % 4) var p = o[s]; else p = o[s - 4]; a[c] = c < 4 || s <= 4 ? p : h[i[p >>> 24]] ^ l[i[p >>> 16 & 255]] ^ f[i[p >>> 8 & 255]] ^ u[i[255 & p]] } } }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._keySchedule, o, s, a, c, i) }, decryptBlock: function (t, r) { var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e, this._doCryptBlock(t, r, this._invKeySchedule, h, l, f, u, n); e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e }, _doCryptBlock: function (t, r, e, i, n, o, s, a) { for (var c = this._nRounds, h = t[r] ^ e[0], l = t[r + 1] ^ e[1], f = t[r + 2] ^ e[2], u = t[r + 3] ^ e[3], d = 4, p = 1; p < c; p++) { var y = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ e[d++], _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ e[d++], v = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ e[d++], g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ e[d++]; h = y, l = _, f = v, u = g } y = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ e[d++], _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ e[d++], v = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ e[d++], g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ e[d++]; t[r] = y, t[r + 1] = _, t[r + 2] = v, t[r + 3] = g }, keySize: 8 }); t.AES = r._createHelper(p) }(), function () { var t = CryptoJS, r = t.lib, e = r.WordArray, i = r.BlockCipher, n = t.algo, o = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], s = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], a = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], c = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], h = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], l = n.DES = i.extend({ _doReset: function () { for (var t = this._key.words, r = [], e = 0; e < 56; e++) { var i = o[e] - 1; r[e] = t[i >>> 5] >>> 31 - i % 32 & 1 } for (var n = this._subKeys = [], c = 0; c < 16; c++) { var h = n[c] = [], l = a[c]; for (e = 0; e < 24; e++)h[e / 6 | 0] |= r[(s[e] - 1 + l) % 28] << 31 - e % 6, h[4 + (e / 6 | 0)] |= r[28 + (s[e + 24] - 1 + l) % 28] << 31 - e % 6; h[0] = h[0] << 1 | h[0] >>> 31; for (e = 1; e < 7; e++)h[e] = h[e] >>> 4 * (e - 1) + 3; h[7] = h[7] << 5 | h[7] >>> 27 } var f = this._invSubKeys = []; for (e = 0; e < 16; e++)f[e] = n[15 - e] }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._subKeys) }, decryptBlock: function (t, r) { this._doCryptBlock(t, r, this._invSubKeys) }, _doCryptBlock: function (t, r, e) { this._lBlock = t[r], this._rBlock = t[r + 1], f.call(this, 4, 252645135), f.call(this, 16, 65535), u.call(this, 2, 858993459), u.call(this, 8, 16711935), f.call(this, 1, 1431655765); for (var i = 0; i < 16; i++) { for (var n = e[i], o = this._lBlock, s = this._rBlock, a = 0, l = 0; l < 8; l++)a |= c[l][((s ^ n[l]) & h[l]) >>> 0]; this._lBlock = s, this._rBlock = o ^ a } var d = this._lBlock; this._lBlock = this._rBlock, this._rBlock = d, f.call(this, 1, 1431655765), u.call(this, 8, 16711935), u.call(this, 2, 858993459), f.call(this, 16, 65535), f.call(this, 4, 252645135), t[r] = this._lBlock, t[r + 1] = this._rBlock }, keySize: 2, ivSize: 2, blockSize: 2 }); function f(t, r) { var e = (this._lBlock >>> t ^ this._rBlock) & r; this._rBlock ^= e, this._lBlock ^= e << t } function u(t, r) { var e = (this._rBlock >>> t ^ this._lBlock) & r; this._lBlock ^= e, this._rBlock ^= e << t } t.DES = i._createHelper(l); var d = n.TripleDES = i.extend({ _doReset: function () { var t = this._key.words; if (2 !== t.length && 4 !== t.length && t.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192."); var r = t.slice(0, 2), i = t.length < 4 ? t.slice(0, 2) : t.slice(2, 4), n = t.length < 6 ? t.slice(0, 2) : t.slice(4, 6); this._des1 = l.createEncryptor(e.create(r)), this._des2 = l.createEncryptor(e.create(i)), this._des3 = l.createEncryptor(e.create(n)) }, encryptBlock: function (t, r) { this._des1.encryptBlock(t, r), this._des2.decryptBlock(t, r), this._des3.encryptBlock(t, r) }, decryptBlock: function (t, r) { this._des3.decryptBlock(t, r), this._des2.encryptBlock(t, r), this._des1.decryptBlock(t, r) }, keySize: 6, ivSize: 2, blockSize: 2 }); t.TripleDES = i._createHelper(d) }(), function () { var t = CryptoJS, r = t.lib.StreamCipher, e = t.algo, i = e.RC4 = r.extend({ _doReset: function () { for (var t = this._key, r = t.words, e = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)i[n] = n; n = 0; for (var o = 0; n < 256; n++) { var s = n % e, a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255; o = (o + i[n] + a) % 256; var c = i[n]; i[n] = i[o], i[o] = c } this._i = this._j = 0 }, _doProcessBlock: function (t, r) { t[r] ^= n.call(this) }, keySize: 8, ivSize: 0 }); function n() { for (var t = this._S, r = this._i, e = this._j, i = 0, n = 0; n < 4; n++) { e = (e + t[r = (r + 1) % 256]) % 256; var o = t[r]; t[r] = t[e], t[e] = o, i |= t[(t[r] + t[e]) % 256] << 24 - 8 * n } return this._i = r, this._j = e, i } t.RC4 = r._createHelper(i); var o = e.RC4Drop = i.extend({ cfg: i.cfg.extend({ drop: 192 }), _doReset: function () { i._doReset.call(this); for (var t = this.cfg.drop; t > 0; t--)n.call(this) } }); t.RC4Drop = r._createHelper(o) }(), function () { var t = CryptoJS, r = t.lib.StreamCipher, e = t.algo, i = [], n = [], o = [], s = e.Rabbit = r.extend({ _doReset: function () { for (var t = this._key.words, r = this.cfg.iv, e = 0; e < 4; e++)t[e] = 16711935 & (t[e] << 8 | t[e] >>> 24) | 4278255360 & (t[e] << 24 | t[e] >>> 8); var i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (e = 0; e < 4; e++)a.call(this); for (e = 0; e < 8; e++)n[e] ^= i[e + 4 & 7]; if (r) { var o = r.words, s = o[0], c = o[1], h = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u; for (e = 0; e < 4; e++)a.call(this) } }, _doProcessBlock: function (t, r) { var e = this._X; a.call(this), i[0] = e[0] ^ e[5] >>> 16 ^ e[3] << 16, i[1] = e[2] ^ e[7] >>> 16 ^ e[5] << 16, i[2] = e[4] ^ e[1] >>> 16 ^ e[7] << 16, i[3] = e[6] ^ e[3] >>> 16 ^ e[1] << 16; for (var n = 0; n < 4; n++)i[n] = 16711935 & (i[n] << 8 | i[n] >>> 24) | 4278255360 & (i[n] << 24 | i[n] >>> 8), t[r + n] ^= i[n] }, blockSize: 4, ivSize: 2 }); function a() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)n[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < n[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < n[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < n[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < n[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < n[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < n[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < n[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < n[7] >>> 0 ? 1 : 0; for (e = 0; e < 8; e++) { var i = t[e] + r[e], s = 65535 & i, a = i >>> 16, c = ((s * s >>> 17) + s * a >>> 15) + a * a, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); o[e] = c ^ h } t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0 } t.Rabbit = r._createHelper(s) }(), function () { var t = CryptoJS, r = t.lib.StreamCipher, e = t.algo, i = [], n = [], o = [], s = e.RabbitLegacy = r.extend({ _doReset: function () { var t = this._key.words, r = this.cfg.iv, e = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], i = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (var n = 0; n < 4; n++)a.call(this); for (n = 0; n < 8; n++)i[n] ^= e[n + 4 & 7]; if (r) { var o = r.words, s = o[0], c = o[1], h = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; i[0] ^= h, i[1] ^= f, i[2] ^= l, i[3] ^= u, i[4] ^= h, i[5] ^= f, i[6] ^= l, i[7] ^= u; for (n = 0; n < 4; n++)a.call(this) } }, _doProcessBlock: function (t, r) { var e = this._X; a.call(this), i[0] = e[0] ^ e[5] >>> 16 ^ e[3] << 16, i[1] = e[2] ^ e[7] >>> 16 ^ e[5] << 16, i[2] = e[4] ^ e[1] >>> 16 ^ e[7] << 16, i[3] = e[6] ^ e[3] >>> 16 ^ e[1] << 16; for (var n = 0; n < 4; n++)i[n] = 16711935 & (i[n] << 8 | i[n] >>> 24) | 4278255360 & (i[n] << 24 | i[n] >>> 8), t[r + n] ^= i[n] }, blockSize: 4, ivSize: 2 }); function a() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)n[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < n[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < n[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < n[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < n[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < n[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < n[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < n[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < n[7] >>> 0 ? 1 : 0; for (e = 0; e < 8; e++) { var i = t[e] + r[e], s = 65535 & i, a = i >>> 16, c = ((s * s >>> 17) + s * a >>> 15) + a * a, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); o[e] = c ^ h } t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0 } t.RabbitLegacy = r._createHelper(s) }();
}