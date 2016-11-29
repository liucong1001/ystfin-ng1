/**
 * Created by 扬 on 2016/10/20.
 */
"use strict"
var app = require("../../ngcommon")
require("../../service/printarea")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/edit',{template:require("./html/seller/sellerEdit.html")})
}])

app.controller("transSellerStep1",["$scope",function () {

}])