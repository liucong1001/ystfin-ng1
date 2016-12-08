/**
 * Created by 扬 on 2016/11/29.
 */
"use strict"
module.exports = function (app) {
    var config
    var inited = false
    var scan = true
    var status = "00"
    app.factory("$icard", ["$q","$http","$filter","$rootScope",function ($q,$http,$filter,$rootScope) {
        return {
            init:function () {
                var deferred = $q.defer()
                var promise = deferred.promise
                scan = true
                if(inited){
                    deferred.resolve(true)
                    return promise
                }
                if ($('#__icCardWriterCtrl').length == 0){
                    $('body').append('<OBJECT style="display:block;width:1px;height:1px;left:-1600px;position:absolute;" ID="__icCardWriterCtrl" CLASSID="CLSID:DB46BF5C-ECCF-41F6-B336-304916BD4166"></OBJECT>');
                }
                function writerInit(market,maker,txnSlot) {
                    try {
                        if ($('#__icCardWriterCtrl')[0].Init(market,maker,0x11,txnSlot)) {
                            inited = true
                            deferred.resolve(true)
                        }
                    }
                    catch (e) {
                        console.log(e)
                        deferred.reject(e)
                    }
                }
//                $('#__icCardWriterCtrl')[0].debug(function (message) {
 //                   console.log(message)
  //              })
                if(!config) {
                    $http.get("/icard/config").then(function (result) {
                        config = result.data
                        writerInit(config.market,config.maker,config.txnSlot)
                    }, function () {
                        deferred.reject("无法获取配置文件")
                    })
                }
                else{
                    writerInit(config.market,config.txnSlot);
                }
                return promise
            },

            scanCard: function (callback) {
                var ctrl = document.getElementById("__icCardWriterCtrl")
                var intv = setInterval(function () {
                    if(!scan) return
                    if(ctrl.Power()){
//                        clearInterval(intv)
                        var amount = ctrl.ReadBalance()
                        var cardNo = ctrl.ReadCardNo()
                        callback(cardNo,amount)
                    }
                    else{
                        callback()
                    }
                }, 1000)
                return intv
            },
            showText:function (text) {
                var ctrl = document.getElementById("__icCardWriterCtrl")
                ctrl.ShowText(text);
            },
            stopScan:function () {
               scan = false
            },
            recharge: function (amount,date,time) {
                scan = false
                var ctrl = document.getElementById("__icCardWriterCtrl")
                try {
                    return ctrl.Recharge(amount, date, time)
                }
                catch(e){
                    console.log(e)
                    return ""
                }
                finally {
                    scan = true
                }
            },
            pay: function (amount,date,time) {
                scan = false
                var ctrl = document.getElementById("__icCardWriterCtrl")
                try {
                    return ctrl.Pay(amount, date, time)
                }
                catch(e){
                    console.log(e)
                    return ""
                }
                finally {
                    scan = true
                }
            }
/*
            open:function () {
//                status = "00"
                if ($('#__icCardWriterCtrl').length == 0){
                    $('body').append('<OBJECT style="display:block;width:1px;height:1px;left:-1600px;position:absolute;" ID="__icCardWriterCtrl" CLASSID="CLSID:DB46BF5C-ECCF-41F6-B336-304916BD4166"></OBJECT>');
                }
                var ctrl = docuemnt.getElementById("__icCardWriterCtrl")
                setInterval(function () {
                    try {
                        if(!scan) return
                        if (!config) {
                            $http.get("/icard/config").then(function (result) {
                                config = result.data
                                ctrl.init(config.market, config.maker, config.txnSlot)
                            },function () {
                                $rootScope.$broadcast("icardStatusChanged","03","获取配置文件失败")     // 初始化失败
                            })
                        } else {
                            ctrl.init(config.market, config.maker, config.txnSlot)
                        }
                    }
                    catch (ex){
                        $rootScope.$broadcast("icardStatusChanged","04","写卡器初始化失败")     // 初始化失败
                    }
                    try {
                        if (ctrl.Power()) {
                            var amount = ctrl.ReadBalance()
                            var cardNo = ctrl.ReadCardNo()
                            if (amount != curAmount || curAmount != cardNo) {
                                ctrl.ShowText("余额:" + $filter("currency")(ctrl.ReadBalance() / 100, "") + "元")
                            }
                            curCardNo = cardNo
                            curAmount = amount
                            $rootScope.$broadcast("icardStatusChanged","01",cardNo)     // 获取到卡号
                        }
                        else {
                            $rootScope.$broadcast("icardStatusChanged","02")     // 未获到卡号
                            ctrl.ShowText("")
                        }
                    }
                    catch (ex){}
                },1000)
            }
            */
        }

    }])
}
