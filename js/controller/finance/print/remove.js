/**
 * Created by 10973 on 2017/4/17.
 */
/**
 * Created by 10973 on 2017/4/17.
 */
/**
 * Created by Ñï on 2017/2/14.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/finance/remove',{
        template:require("./html/remove.html"),
        controller:"removeCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("removeCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location", "$routeParams",function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams) {
  
    //µã»÷Ò³Ãæ·µ»Ø
    $scope.back=function(){
        $location.path('/finance/print');
    }
}])