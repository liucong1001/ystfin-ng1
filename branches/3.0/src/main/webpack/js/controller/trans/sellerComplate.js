/**
 * Created by 扬 on 2016/10/12.
 */
"use strict"
var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/complate/:archivesNo',{template:require("./html/seller/sellerComplate.html")})
}])
app.controller("transSellerComplate",["$scope","$routeParams","$location","$http",function($scope,$params,$location,$http){
    $scope.archivesNo = $params.archivesNo
    $scope.returnFirst = function () {
        console.log("----------")
        $location.url("/trans/seller/step1")
        window.scrollTo(0,0)
    }
    // 打印证件
    $scope.printCarCert = function () {
		$location.url("/trans/printCarCert/"+$scope.archivesNo);
    }
    
}])