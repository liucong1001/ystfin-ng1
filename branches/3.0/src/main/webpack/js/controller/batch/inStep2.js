/**
 * Created by peter on 2016/11/29.
 */
"use strict";
var app = require("../../ngcommon");

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/batch/in/step2",{
        controller:"batchStep2Controller",
        template:require("./html/in/step2.html")
    });
}]);

app.controller("batchStep2Controller",["$scope","$http","$location","batchInStep","$templateCache","$webcam","$idcard",function ($scope,$http,$location,Step,$tpc,$webcam,$idcard) {
	$webcam.show("280px","150px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })
    $scope.seller = {
        certType: "01"         // 01 居民身份证 02 港澳身份证 03 居住证 04 企业营业执照 05 机构代码证
    }
	$scope.snapshot = function (img,index,xuanzhuan) {
        $scope.status[img] = "正在拍照上传..."
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
                $scope.seller[img] = filename
            })
            
        },xuanzhuan)
        $scope.active = index + 1
    }
    $scope.upload = function($file,type,index){
        $scope.status[type] = "正在上传..."
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope.seller[type] = ret.data
            },
            function (err) {
                console.log(err)
            },
            function (evt) {
                console.log(evt)
            }
        )
    }
    $scope.certCount = 0
    $scope.idcardReady = $idcard.init()
    
    $scope.readCard = function () {
        var idcard = $idcard.read()
        console.log(idcard)
        if(idcard){
            $scope.seller.idcardName = idcard.name
            $scope.seller.idcardAddress = idcard.address
            $scope.seller.idcardSex = idcard.sex
            $scope.seller.idcardBirthday = idcard.birthday
            $scope.seller.idcardLimitEnd = idcard.userLifeE
            $scope.seller.idcardNo = idcard.cardNo
            $scope.seller.idcardNation = idcard.nation
        }
    }
    // 证件模板
    $tpc.put("sellerCert01",require("./html/in/sellerCert01.html"))
    $tpc.put("sellerCert02",require("./html/in/sellerCert02.html"))
    $tpc.put("sellerCert03",require("./html/in/sellerCert03.html"))
    $tpc.put("sellerCert04",require("./html/in/sellerCert04.html"))
    $tpc.put("sellerCert05",require("./html/in/sellerCert05.html"))
	
	$scope.error = function () {
        if(!this.theContact){
            return true;
        }
        return false;
    };
    
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step({
        	
        });
        step.$save({step:"step2"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/step3");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };
    
    $scope.prev = function () {
        var step = new Step($scope.seller)
        step.$save({step:"step2"});
        $location.path("/batch/in/step1");
        window.scrollTo(0,0);
    };
    
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + path;
    };
	
	
}]);