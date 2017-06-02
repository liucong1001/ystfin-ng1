/**
 * Created by 10973 on 2017/6/2.
 */
/**
 * Created by 10973 on 2017/6/2.
 */
"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/icard/consumptiondetail',{
        template:require("./html/consumptionDetail.html"),
        controller:"consumptionDetail"
    })
}]);
app.controller("consumptionDetail", ["$scope","$convert","$q","$filter","$location","$routeParams","$http" ,function ($scope,$convert,$q,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.startTime=$routeParams.startDate;
    $scope.endTime=$routeParams.endDate;
    $scope.name=$routeParams.name;
    //从后台获取消费明细信息
    $scope.cardDetail=function(){
        $http({
            method:'POST',
            url:'/bill/mxConsum',
            params:{startDate:$scope.startTime,endDate:$scope.endTime,name:$scope.name},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function(data){
            console.log(data);
            $scope.cardData=data;
        })
    };
    $scope.cardDetail();
    //导出excel表
    $scope.exportOrder = function () {
        $http({
            url: 'bill/export/mxConsum',
            method: "POST",
            params:{startDate:$scope.startTime,endDate:$scope.endTime,name:$scope.name},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.ms-excel"});
            var objectUrl = URL.createObjectURL(blob);
            var filename="武汉爱之家长丰旧机动车交易市场消费报表"+'.xls';
            if (window.navigator.msSaveOrOpenBlob) {// For IE:
                navigator.msSaveBlob(blob, filename);
            }else{ // For other browsers:
                URL.revokeObjectURL(objectUrl);
            }
        }).error(function(data){
            alert(data.message);
        });
    };
}]);