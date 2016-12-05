/**
 * Created by 扬 on 2016/11/30.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/bind/:dealersId",{
        controller:"icardBindController",
        template:require("./html/bind.html")
    })
}])

app.controller("icardBindController",["$scope","$http","$routeParams","$icard",function ($scope,$http,$routeParams,$icard) {
    $scope.dealersId = $routeParams.dealersId

    $http.get("/dealers/" + $scope.dealersId).then(function (result) {
        $scope.dealers = result.data
    })

    $scope.intv = 0
    $scope.initCardWriter = function () {
        $icard.init().then(function () {
            $scope.icardWriterReady = true
        },function () {
            $scope.icardWriterReady = false
        })
    }
    $scope.initCardWriter()

    $scope.$watch("intv",function (val,old) {
        console.log("******",val,old)
        if(old) clearInterval(old)
    })
    $scope.$on("$destroy",function () {
        console.log("********",$scope.intv)
        if($scope.intv) clearInterval($scope.intv)
    })
    $scope.$watch("icardWriterReady", function (val,old) {
        $scope.intv = $icard.scanCard(function (cardNo) {
            $scope.$apply(function () {
                $scope.cardNo = cardNo
            })
        })
        console.log("--------",$scope.intv)
    })
    $scope.bindCard = function () {
        if(!this.cardNo) return false
        $http.post("/icard/bind",{delars:this.dealersId,cardNo:this.cardNo}).then(function () {
            $scope.bindMessage = "success"
        },function (result) {
            $scope.bindMessage = result.data.message
        })
    }
}])