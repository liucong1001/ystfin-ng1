/**
 * Created by 扬 on 2017/1/23.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step0',{
        controller:"transSellerStep0",
        template:require("./html/seller/sellerStep0.html"),
        resolve:{
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            sessionSeller: ["$seller", "$route", function ($seller) {
                return $seller.get("/seller").$promise
            }]
        }
    })
}])

var utils = require("../../lib/utils")
app.controller("transSellerStep0",["$scope","$rootScope","$location","$seller", "$http","$routeParams","$q","Upload","$webcam","gconfig","sessionSeller",
function($scope, $rootScope,$location,$seller,$http,$routeParams,$q,$upload,$webcam,gconfig,sessionSeller) {
    //$scope.tr = sessionSeller
    //if(sessionSeller && sessionSeller.vehicle && sessionSeller.vehicle.plateNumber){
    //    $scope.plateNumber = sessionSeller.vehicle.plateNumber.substring(2)
    //}
    $scope.gconfig = gconfig
    $webcam.show("10px","calc(100% - 280px)",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })

    $scope.searchContact= function(key) {
        var d = $q.defer();
        $http.get("/contact/search",{params:{key:key}}).then(function (result) {
            d.resolve(result.data)
        },function () {
            d.reject()
        })
        return d.promise
    }
    $scope.contactList = $scope.searchContact("")

    $rootScope.subTitle = "原车主录入"
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
    $scope.invalid = function () {
        if(!$scope.plateNumber || $scope.plateNumber.length != 5) return true
        if(!$scope.tr || !$scope.tr.vehicle || !$scope.tr.vehicleCert || !$scope.tr.vehicleCert.path
            || !$scope.tr.vehicleCertBg || !$scope.tr.vehicleCertBg.path
            || !$scope.tr.vehicle.registrationCert || !$scope.tr.vehicle.registrationCert.path
            || !$scope.tr.vehicle.registrationCertBg || !$scope.tr.vehicle.registrationCertBg.path){
            return true
        }
        return false
    }
    $scope.onSubmit = function (form) {
        var seller = new $seller($scope.tr)
        seller.theContact = $scope.selectedContact
        seller.vehicle.plateNumber = gconfig.plateNumberPrefix + $scope.plateNumber
        seller.$save({step:'step0'}).then(function () {
            $location.path("/trans/seller/step1")
        },function (error) {
            $scope.errorMessage = error.data.message
        })
    }
    $scope.loadPlate = function () {
        if(!$scope.plateNumber) return
        var pn = gconfig.plateNumberPrefix + $scope.plateNumber
        $seller.get({step:'step0',pn:pn},function (result) {
            $scope.plateNumberNotFound = false
            $scope.tr = result
        },function (result) {
            $scope.tr = {}
            $scope.plateNumberNotFound = true
        })
    }
    $scope.clear = function () {
        $seller.remove()
        $scope.tr = {}
        $scope.plateNumber = ""
    }
}])
