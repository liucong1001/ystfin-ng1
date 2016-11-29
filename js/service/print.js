/**
 * Created by 扬 on 2016/10/31.
 */
"use strict"
module.exports = function (app) {
    app.factory("$print", function () {
        return {
            init: function () {
                if ($('#__idCardReaderCtrl').length > 0) return;
                $('body').append('<object id="__LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0></object> ');
            },
            printArea:function (elem,left,top,width,height) {
                var LODOP=document.getElementById("__LODOP") //getLodop();
                //LODOP.PRINT_INIT("打印入库流程");
                //LODOP.ADD_PRINT_TEXT(50,231,260,39,"打印页面部分内容");
                LODOP.SET_PRINT_TEXT_STYLE(1,"宋体",14,1,0,0,1)
                console.log(elem,angular.element(elem).html())
                LODOP.ADD_PRINT_HTM(top,left,width,height,angular.element(elem).html())
//				LODOP.ADD_PRINT_HTM(100,900,600,200,$('barcode'));
                LODOP.PRINT();
            }
        }
    })
}
