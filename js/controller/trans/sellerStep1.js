/**
 * Created by 扬 on 2016/10/9.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step1', {
            template: require("./html/seller/sellerStep1.html"),
            controller: "transSellerStep1",
            resolve: {
                sessionSeller: ["$seller", "$route", function ($seller) {
                    return $seller.get("/seller").$promise
                }]
            }
    })
}])
var utils = require("../../lib/utils")
app.controller("transSellerStep1",["$scope","$templateCache","$location","$webcam","$idcard","$seller","Upload","$routeParams","sessionSeller",
function($scope,$tpc,$location,$webcam,$idcard,$seller,$upload,params,sessionSeller){
    $scope.tr = sessionSeller
    if($scope.tr && $scope.tr.seller){
        $scope.seller = $scope.tr.seller
        $scope.seller.certType = $scope.seller.certType || "01"
    }
    else{
        $scope.seller = {
            certType: "01"         // 01 居民身份证 02 港澳身份证 03 居住证 04 企业营业执照 05 机构代码证
        }
    }

    $webcam.show("280px","190px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })
    // 证件模板
    $tpc.put("sellerCert01",require("./html/seller/sellerCert01.html"))
    $tpc.put("sellerCert02",require("./html/seller/sellerCert02.html"))
    $tpc.put("sellerCert03",require("./html/seller/sellerCert03.html"))
    $tpc.put("sellerCert04",require("./html/seller/sellerCert04.html"))
    $tpc.put("sellerCert05",require("./html/seller/sellerCert05.html"))

    $scope.upload = function($file,props) {
        //$scope.status[type] = "正在上传..."
        $upload.upload({
            url: "/common/upload/single",
            file: $file
        }).then(function (ret) {
                utils.setObjVal($scope,props,"temp/" + ret.data)
            },
            function (err) {
            },
            function (evt) {
            })
    }

    $scope.snapshot = function (props,xuanzhuan) {
        //$scope.status[img] = "正在拍照上传..."
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
//                $scope.seller[img] = filename
                utils.setObjVal($scope,props,"temp/" + filename)
            })
        },xuanzhuan)
        //       $scope.active = index + 1
    }
    $scope.invalid = function () {
        var seller = $scope.seller
        try {
            if (seller.certType == "01" && seller.idCardFront.path && seller.idCardBg.path) return false
            else if (seller.certType == "03" && seller.idCardFront.path && seller.idCardBg.path && seller.juzhuCertFront.path && seller.juzhuCertBack.path) return false
            else if (seller.certType == "04" && seller.organizeCert.path) return false
            else if (seller.certType == "05" && seller.organizeCert.path && seller.businessCert.path && seller.taxCert.path) return false
        }catch(e){
        }
        return true
    }

    $scope.onSubmit = function (form) {
        var seller = new $seller({seller:$scope.seller})
        seller.$save({step:"step1"}).then(function (result) {
            $location.path("/trans/seller/step2")
        },function (result) {
            $scope.errorMessage = result.data.message
        })
    }
}])