/**
 * Created by 扬 on 2017/1/23.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step0',{
        controller:"transSellerStep0",
        template:require("./html/seller/sellerStep0.html")
    })
}])

var utils = require("../../lib/utils")
app.controller("transSellerStep0",["$scope","$rootScope","$location","$seller", "$http","$routeParams","$q","Upload","$webcam",
function($scope, $rootScope,$location,$seller,$http,$routeParams,$q,$upload,$webcam) {
    $webcam.show("280px","190px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })
    $rootScope.subTitle = "原车主录入"
    $scope.upload = function($file,props) {
        //$scope.status[type] = "正在上传..."
        $upload.upload({
            url: "/common/upload/single",
            file: $file
        }).then(function (ret) {
            console.log(ret.data)
            utils.setObjVal($scope,props,"temp/" + ret.data)
        },
        function (err) {
                console.log(err)
        },
        function (evt) {
                console.log(evt)
        })
    }
}])
