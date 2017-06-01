/**
 * Created by 10973 on 2017/6/1.
 */
/**
 * Created by —Ô on 2016/11/30.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/setPwd/",{
        controller:"setPwdController",
        template:require("./html/setPwd.html")
    })
}])

app.controller("setPwdController",["$scope","$http","$routeParams","$icard","md5","$location",function ($scope,$http,$routeParams,$icard,md5,$location) {
    //$scope.dealersId = $routeParams.dealersId;
    $scope.intv = 0;
    $scope.initCardWriter = function () {
        $icard.init().then(function () {
            $scope.icardWriterReady = true
        },function () {
            $scope.icardWriterReady = false
        })
    }
    $scope.$watch("cardMessage",function (val) {
        $icard.showText(val)
    })
    $scope.initCardWriter()
    $scope.$watch("intv",function (val,old) {
        if(old) clearInterval(old)
    })

    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.cardNo=$routeParams.cardNo;
    $scope.$watch("cardNo",function (val) {
        if(val&&val != null){
            $http.get("/icard/cardNo/" + val).then(function (result) {
                $scope.account = result.data
                $scope.accountLoadMessge = ""
            },function (result) {
                $scope.accountLoadMessge = result.data.message
            })
        }else{
            $scope.account = {}
            $scope.accountLoadMessge = ""
        }
    })

    $scope.cardPwd = function () {
        if(!this.cardNo) return false
        var delars=this.dealersId;
        var cardNo=this.cardNo;
        clearInterval($scope.intv);
        $scope.intv = 0;
        $icard.playVoice(4);

        $icard.getPassword().then(function (pwd) {
            if(pwd.length!=6){
                $icard.playVoice(8);
            }else{
                $icard.playVoice(14);
                $icard.getPassword().then(function(repwd){
                    if(repwd!=pwd){
                        $icard.playVoice(5);
                    }else{
                        var pwdMd5=md5.createHash(pwd);
                        $http.post("/icard/changePwd",{cardNo:$scope.cardNo,password:pwdMd5}).then(function () {
                            $scope.bindMessage = "success";
                            $icard.playVoice(6);
                        },function (result) {
                            $scope.bindMessage = result.data.message
                        })

                    }
                })
            }
        },function () {
            console.log(" ‰»Î√‹¬Î ß∞‹")
        });




    }
}])