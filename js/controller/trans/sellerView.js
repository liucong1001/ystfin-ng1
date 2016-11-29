/**
 * Created by 扬 on 2016/10/26.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/view/:archivesNo',{template:require("./html/seller/sellerView.html")})
}])

app.controller("transSellerView",["$scope","$routeParams","$http",function ($scope,$params,$http) {
    $http.get("/trans/findOneByArchivesNo/" + $params.archivesNo).then(function(result){
        $scope.trans = result.data
        var imgs = []
        $scope.imgs = []
        $scope.active = 0
        $scope.activeImage = function (index) {
            $scope.active = index
        }
        var tr = $scope.trans
        var seller = tr.seller
        var ve = tr.vehicle
        imgs.push(seller.regPhoto)
        imgs.push(seller.fingerprintImg)
        switch(seller.certType){
            case "01":
                imgs.push(seller.idCardFront)
                imgs.push(seller.idCardBg)
                break
            case "02":
                imgs.push(seller.idCardFront)
                imgs.push(seller.idCardBg)
                imgs.push(seller.gangaoCertFront)
                imgs.push(seller.gangaoCertBack)
                break
            case "03":
                imgs.push(seller.idCardFront)
                imgs.push(seller.idCardBg)
                imgs.push(seller.juzhuCertFront)
                imgs.push(seller.juzhuCertBack)
                break
            case "04":
                imgs.push(seller.organizeCert)
                break
            case "05":
                imgs.push(seller.organizeCert)
                imgs.push(seller.businessCert)
                imgs.push(seller.taxCert)
                break
        }
        imgs.push(tr.vehicleCert)
        imgs.push(tr.vehicleCertBg)
        imgs.push(ve.registrationCert)
        imgs.push(ve.registrationCertBg)
        if(tr.fileType && tr.fileType.sellerAlbum){
            $scope.imgs = imgs.concat(tr.fileType.sellerAlbum.files)
        }else{
            $scope.imgs = imgs
        }
    })
}])