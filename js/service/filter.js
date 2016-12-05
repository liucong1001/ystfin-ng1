/**
 * Created by 扬 on 2016/12/1.
 */
"use strict"
module.exports = function (app) {
    var $ = require('jquery');
    app.filter("amountHZ", function () {
        return function(n) {
            // 大小写转换
                if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                    return "";
                var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
                n += "00";
                var p = n.indexOf('.');
                if (p >= 0)
                    n = n.substring(0, p) + n.substr(p + 1, 2);
                unit = unit.substr(unit.length - n.length);
                for (var i = 0; i < n.length; i++)
                    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
                return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");

        }
     })
    app.filter("amountFormat",function(){
            // 金额格式化  10,000.00
            return function (s, n) {
                var c = n;
                n = n > 0 && n <= 20 ? n : 2;
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                var l = s.split(".")[0].split("").reverse(),
                    r = s.split(".")[1];
                t = "";
                for (var i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                return t.split("").reverse().join("") + (c == 0 ? "" : ("." + r) );
            }
    })
}
