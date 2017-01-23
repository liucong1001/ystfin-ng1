/**
 * Created by peter on 2017/1/23.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/batch/in/complete/:batchNo',{
        controller:"batchStepComplate",
        template:require("./html/in/inStepComplete.html")
    })
}])

app.controller("batchStepComplate",["$scope","$routeParams","$location","$http",function($scope,$params,$location,$http){
    $scope.batchNo = $params.batchNo;
    $scope.returnFirst = function () {
        $location.url("/batch/in/step1");
        window.scrollTo(0,0)
    }

}])