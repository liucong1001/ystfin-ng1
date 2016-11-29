/**
 * Created by 扬 on 2016/10/9.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step2',{template:require("./html/seller/sellerStep2.html")})
}])
app.controller("transSellerStep2",["$scope","$templateCache","$location","$webcam","$idcard","sellerStep","Upload","$routeParams",function($scope,$tpc,$location,$webcam,$idcard,Step,Upload){
    $webcam.show("280px","190px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })
    $scope.seller = {
        certType: "01"         // 01 居民身份证 02 港澳身份证 03 居住证 04 企业营业执照 05 机构代码证
    }
    $scope.status = {}
    $scope.certs = []
    $scope.error = function () {
        if(!this.seller.driving || !this.seller.drivingBg
            || !this.seller.registration || !this.seller.registrationBg){
            console.log("----------")
            return true
        }
        for(var i in $scope.certs){
            if(!$scope.seller[$scope.certs[i]]){
                console.log("++++++++++",$scope.certs,$scope.seller[$scope.certs[i]])
                return true
            }
        }
        return false
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

    // 设置证件数量
    $scope.$watch("seller.certType",function(val,old){
        $scope.active = 1
        switch(val){
            case "01":
                $scope.certCount = 2;
                $scope.certs = ["cert","certBg"]
                break;
            case "02":
            case "03":
                $scope.certCount = 4;
                $scope.certs = ["cert","certBg","cert1","cert1Bg"]
                break;
            case "04":
                $scope.certCount = 1;
                $scope.certs = ["cert"]
                break;
            case "05":
                $scope.certCount = 3;
                $scope.certs = ["cert","taxReg","buslicense"]
                break;
        }
        //$scope.seller.cert = $scope.seller.certBg = $scope.seller.cert1 = $scope.seller.cert1Bg = ""
        $scope.status = {}
    })
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
    $tpc.put("sellerCert01",require("./html/seller/sellerCert01.html"))
    $tpc.put("sellerCert02",require("./html/seller/sellerCert02.html"))
    $tpc.put("sellerCert03",require("./html/seller/sellerCert03.html"))
    $tpc.put("sellerCert04",require("./html/seller/sellerCert04.html"))
    $tpc.put("sellerCert05",require("./html/seller/sellerCert05.html"))

    // 获取后台缓存数据
    Step.get({step:"step2"},function (step1,header) {
        $scope.seller = step1
    })
    $scope.next = function () {
        // 新增
        $scope.submiting = true
        var step = new Step($scope.seller)
        step.$save({step:"step2"}).then(function(result){
            $scope.submiting = false
            $location.path("/trans/seller/step3")
            window.scrollTo(0,0)
        },function (error) {
            $scope.submiting = false
        })
    }
    $scope.prev = function () {
        var step = new Step($scope.seller)
        step.$save({step:"step2"})
        $location.path("/trans/seller/step1")
        window.scrollTo(0,0)
    }
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + window.encodeURI(path)
    }
}])