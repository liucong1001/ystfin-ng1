/**
 * Created by 10973 on 2017/6/23.
 */
/**
 * Created by 扬 on 2016/12/1.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/icard/red",{
        controller:"icardRedController",
        template:require("./html/red.html")
    })
}]);

app.controller("icardRedController",["$scope","$http","$icard","$filter","$location","$routeParams",function ($scope,$http,$icard,$filter,$location,$routeParams) {
    $scope.intv = 0;
    $scope.initCardWriter = function () {
        $icard.init().then(function () {
            $scope.icardWriterReady = true
        },function () {
            $scope.icardWriterReady = false
        })
    };
    $scope.$watch("cardMessage",function (val) {
        $icard.showText(val)
    });
    $scope.initCardWriter()
    $scope.$watch("intv",function (val,old) {
        if(old) clearInterval(old)
    });
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    });
    function scanCard() {
        $scope.intv = $icard.scanCard(function (cardNo,balance) {
            $scope.$apply(function () {
                $scope.cardNo = cardNo;
                //console.log($scope.account);
                // if(cardNo){
                //     $scope.cardMessage = "当前余额:" + $filter("currency")(balance / 100)
                // }
                // else{
                //     $scope.cardMessage = ""
                // }

                if(!cardNo){
                    $scope.cardMessage = ""
                }
            })
        })
    }
    $scope.$watch("icardWriterReady", function (val,old) {
        scanCard()
    })
    $scope.$watch("cardNo",function (val) {
        if(val&&val != null){
            $http.get("/icard/cardNo/" + val).then(function (result) {
                $scope.account = result.data;
                console.log($scope.account);
                $scope.accountLoadMessge = ""
                $scope.cardMessage = "当前余额:" + $filter("currency")($scope.account.dealers.balance / 100)
            },function (result) {
                $scope.accountLoadMessge = result.data.message
            })
        }else{
            $scope.account = {}
            $scope.accountLoadMessge = ""
        }
    })
    $scope.$on("$destroy",function () {
        if($scope.intv) clearInterval($scope.intv)
    })


    //获取字符串长度
    function GetLength(str){
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }
    //监听发票号
    $scope.$watch("billNo",function(val){
        var billNo = $scope.billNo;
        if(GetLength(val)==8){
         /* console.log(val);
          $http({
              method:"post",
              url:"/icard/getRedAmount",
              params:{'billNo':billNo}
          }).success(function(data){
              console.log(data);
              $scope.redAmount=data.redAmount;
          }).error(function(data){
               console.log("请求失败！");
          });*/
          $http.post('/icard/getRedAmount',{billNo:billNo}).success(function (data) {
              $scope.redAmount = data.redAmount/100;
          }).error(function (data) {
              console.log(data);
              $scope.rechargeMessage = data.message;
          })
        }
    });
    $scope.recharge = function () {
        clearInterval($scope.intv);
        $scope.intv = 0;
        var date = $filter("date")(Date.now(),"yyyyMMdd");
        var time = $filter("date")(Date.now(),"HHmmss");
        var billNo = $scope.billNo;
        //var  redAmount=$scope.redAmount;
        var redAmount=parseFloat($scope.redAmount)*100;
        $http.post("/icard/payRed",{cardNo:$scope.cardNo,billNo:billNo,amount:redAmount,date:date,time:time}).then(function (result) {
            console.log(result);
            console.log($scope.account);
            $scope.account = result.data;
            $scope.rechargeMessage = "success";
            $scope.amount = "";
            $scope.give="";
            $scope.cardMessage = "充值金额:" + $filter("currency")(amount / 100) + "\n当前余额:" + $filter("currency")($scope.account.icCard.balance / 100)
            scanCard();
            $icard.playVoice(6);
        },function (result) {
            $scope.cardMessage = "充值失败"
            $scope.rechargeMessage =  result.data.message
            scanCard()
        })
        /*}*/
    }
    $scope.back = function () {
        $location.path("/account/manager");
    }

}])