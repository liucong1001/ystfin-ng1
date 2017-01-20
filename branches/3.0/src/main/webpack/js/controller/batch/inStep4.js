/**
 * Created by peter on 2017/1/20.
 */
"use strict";
var app = require("../../ngcommon");

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/batch/in/step4",{
        controller:"batchStep4Controller",
        template:require("./html/in/step4.html")
    });
}]);

app.controller("batchStep4Controller",["$scope","$http","$location","batchInStep","$templateCache","$webcam","Upload",function ($scope,$http,$location,Step,$tpc,$webcam,Upload) {

    //返回上一步
    $scope.prev = function () {
        /*var step = new Step($scope.vehicle)
        step.$save({step:"step3"});*/
        $location.path("/batch/in/step3");
        window.scrollTo(0,0);
    };

}]);