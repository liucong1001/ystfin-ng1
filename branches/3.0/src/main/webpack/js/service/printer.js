/**
 * Created by 扬 on 2017/2/10.
 */"use strict"
module.exports = function (app) {
    app.factory("$printer", ["$q","$convert",function ($q,$convert) {
        return {
            init: function () {
                if ($('#__printerCtrl').length > 0) return
                $('body').append('<OBJECT style="display:none;width:200px;height:100px;bottom:300px;;left:-600px;position:absolute;" ID="__fingerprintCtrl" CLASSID="CLSID:7A5FA77D-2C6D-4C7D-A9C1-2A5D3959A86C"></OBJECT>')
            },
            config: function () {
                var ctrl = document.getElementById('__fingerprintCtrl')
                try {
                    $(ctrl).show()
                    ctrl.config()
                }
                catch (e) {
                    alert('打印控件未安装!')
                }
            },
            getPrinters: function () {
                var ctrl = document.getElementById('__fingerprintCtrl')
                try {
                    $(ctrl).show()
                    var list = ctrl.getPrinters()
                    return list.split("|")
                }
                catch (e) {
                    alert('打印控件未安装!', e)
                }
                return []
            },
            getSelected: function () {
                var ctrl = document.getElementById('__fingerprintCtrl')
                try {
                    $(ctrl).show()
                    return ctrl.getSelectedPrinter() || ""
                }
                catch (e) {
                    alert('打印控件未安装!', e)
                }
                return ""
            },
            setSelected: function (printer) {
                var ctrl = document.getElementById('__fingerprintCtrl')
                try {
                    $(ctrl).show()
                    ctrl.setSelectedPrinter(printer)
                }
                catch (e) {
                    alert('打印控件未安装!', e)
                }
            },
            printBill: function (data, config) {
                var defer = $q.defer()
                var ctrl = document.getElementById('__fingerprintCtrl')
                $(ctrl).show()
                var param = $.extend({}, data, {printConfig: config})
                $convert("Vehicle_type").then(function (type) {
                    param.vehicle.vehicleType = type[param.vehicle.vehicleType ].name
                    try{
                        ctrl.print(JSON.stringify(param))
                        defer.resolve(true)
                    }
                    catch (e){
                        defer.reject(e)
                    }
                })
                return defer.promise
            }
        }
    }])
}