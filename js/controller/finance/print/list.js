/**
 * Created by 扬 on 2017/2/13.
 */
"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/finance/print/list',{
        template:require("./html/seller/sellerStep3.html"),
        controller:"printListCtrl",
        resolve: {
        }
    })
}])

app.controller("printListCtrl",["$scope",function ($scope) {

}])