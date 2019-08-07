/**
 * Created by cjl on 2017/8/4.
 */
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var baseWidth = 540;
    var rem = (width > baseWidth ? baseWidth : width) / 10;
    // doc.querySelector('body').style.width = (width > baseWidth ? baseWidth : width)+'px';
    if (!dpr && !scale) {
        var dpr, scale;
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var iPad = win.navigator.appVersion.match(/ipad/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        }else if(iPad){
            if(devicePixelRatio == 2){
                dpr = 4;
            }
        }else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }
    docEl.setAttribute('data-dpr', dpr);
    document.querySelector('html').style.fontSize = rem + 'px';
})(window);
