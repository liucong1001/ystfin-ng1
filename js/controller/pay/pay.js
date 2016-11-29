/**
 * Created by 扬 on 2016/11/28.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/pay/order/pay",{
        controller:"payOrderController",
        template:require("./html/order/pay.html")
    })
}])