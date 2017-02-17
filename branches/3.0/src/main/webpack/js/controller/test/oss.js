/**
 * Created by 扬 on 2016/12/12.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/test/oss",{
        controller:"ossTestController",
        template:require("./html/oss.html")
    })
}])
app.controller("ossTestController",["$scope","$http",function ($scope,$http) {
    $scope.getPolicy = function () {
        $http.get("/oss/upload/policy").then(function (result) {
            $scope.data = result.data
        })
    }
}]);