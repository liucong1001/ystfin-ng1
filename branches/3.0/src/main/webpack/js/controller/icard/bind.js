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

app.controller("icardBindController",["$scope","$http","$routeParams","$icard","md5",function ($scope,$http,$routeParams,$icard,md5) {
    $scope.dealersId = $routeParams.dealersId;
    console.log($scope.dealersId);


    $scope.$watch("cardMessage",function (val) {
        $icard.showText(val)
    });

    $http.get("/dealers/" + $scope.dealersId).then(function (result) {
        $scope.dealers = result.data
        $scope.cardMessage = result.data.name
    });

    //$http.post("/icard/query"  ,{id:$scope.dealersId}).then(function (result) {
    //    $scope.abc = result.data;
    //    console.log($scope.abc);
    //    console.log("账户结束");
    //    //$scope.cardMessage = result.data.name
    //});


    $http({
        method:"post",    　
        url:"/icard/query", 　　 
        params:{'id':$scope.dealersId}　　　　
    }).success(function(data){
        console.log(data);
        $scope.icCards=data.icCards;
        $scope.contactList=data.contactList;
    }).error(function(data){

    });


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
        if(old) clearInterval(old)
    })
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    })
    $scope.$watch("icardWriterReady", function (val,old) {
        $scope.intv = $icard.scanCard(function (cardNo) {
            $scope.$apply(function () {
                $scope.cardNo = cardNo
                $scope.cardMessage = $scope.dealers.name + "\n" + (cardNo || "")
            })
        })
    })
    $scope.bindCard = function () {
        if(!this.cardNo) return false
        var delars=this.icCards.dealers.id;
        var cardNo=this.cardNo;
        var  icCardId=this.icCards.id;
        var  contactId=this.contactList.id;
        console.log(delars,cardNo,icCardId,contactId);
        clearInterval($scope.intv);
        $scope.intv = 0;
        $icard.playVoice(4);

        $icard.getPassword().then(function (pwd) {
            if(pwd.length!=6){
                $icard.playVoice(8);
            }else{
                $icard.playVoice(11);
                $icard.getPassword().then(function(repwd){
                    if(repwd!=pwd){
                        $icard.playVoice(5);
                    }else{
                         var pwdMd5=md5.createHash(pwd);
                        $http.post("/icard/bind",{delars:delars,cardNo:cardNo,icCard:icCardId,theContact:contactId,password:pwdMd5}).then(function () {
                            $scope.bindMessage = "success";
                            $icard.playVoice(6);
                        },function (result) {
                            $scope.bindMessage = result.data.message
                        })

                    }
                })
            }
        },function () {
            console.log("输入密码失败")
        });




    }
}])