/**
 * Created by Administrator on 2017/3/21 0021.
 */
/**
 * Created by Administrator on 2017/3/3 0003.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/inp',{
        template:require("./html/inp.html"),
        controller:"inpCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("inpCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //初始化PC端，手机端下拉框选择为默认状态
    $scope.selectway='0';
    //某月以上个月26号至本月25号为一个月份
    $scope.selectDate=function(dt){
        if(dt==undefined){
            $scope.year=null;
            $scope.lastmounth=null;
            $scope.lastday=null;
        }else{
            $scope.lastday=26;
            if($scope.inpDate.getMonth()==0){
                $scope.lastmounth=12;
                $scope.year=$scope.inpDate.getFullYear()-1;
                $scope.mounth=12;
                $scope.yearD=parseInt($scope.year)+1;
                $scope.mounthD='01';
            }else{
                $scope.year=$scope.inpDate.getFullYear();
                $scope.yearD= $scope.year;
                if($scope.inpDate.getMonth()>9){
                    $scope.lastmounth=$scope.inpDate.getMonth();
                }else{
                    $scope.lastmounth='0'+$scope.inpDate.getMonth();
                }
                //时间
                if($scope.mounthD>9){
                    $scope.mounthD=parseInt($scope.lastmounth)+1;
                }else{
                    var lastmounth=parseInt($scope.lastmounth)+1;
                    $scope.mounthD="0"+lastmounth;
                }
            }
        }

        $scope.datetime.startTime=$scope.year+"-"+ $scope.lastmounth+"-"+$scope.lastday;
        $scope.datetime.endTime=$scope.yearD+"-"+ $scope.mounthD+"-"+"25";
    };

    $scope.datetime={
        'startTime':'',
        'endTime':'',
        'type':$scope.selectway
    };
    //点击查询获取后台数据
    $scope.searchdate=function(){
        $scope.datetime.startTime=$scope.year+"-"+ $scope.lastmounth+"-"+$scope.lastday;
        $scope.datetime.endTime=$scope.yearD+"-"+ $scope.mounthD+"-"+"25";
        $scope.datetime.type= $scope.selectway;
        $http({
            url: 'kpis/inpShow',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            params: $scope.datetime
        }).success(function (data) {
            $scope.num=data.seller;
        }).error(function(data){
            alert(data.message);
        });
    };
    //导出excel表
    $scope.exportOrder = function () {
        $scope.datetime.startTime=$scope.year+"-"+ $scope.lastmounth+"-"+$scope.lastday;
        $scope.datetime.endTime=$scope.yearD+"-"+ $scope.mounthD+"-"+"25";
        $scope.datetime.type= $scope.selectway;
        $http({
            url: 'kpis/export/inp',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            params: $scope.datetime,
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.ms-excel"});
            var objectUrl = URL.createObjectURL(blob);
            var filename="报表"+$scope.yearD+"-"+ $scope.mounthD+'.xls';
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