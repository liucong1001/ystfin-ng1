/**
 * Created by 10973 on 2017/8/1.
 */
/**
 * Created by 10973 on 2017/7/31.
 */

"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/chargeItem/addlistmodify',{
        template:require("./html/order/feeTypeModify.html"),
        controller:"addFeeTypeModifyCtr",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            feeListinfo:["$http","$route",function ($http,$route) {
                return $http.get("/chargeItem?id=" + $route.current.params.id)
            }]
        }
    })
}])
app.controller("addFeeTypeModifyCtr", ["$scope","$convert","$q","gconfig","$filter","$location","$routeParams","$http","$route","feeListinfo", function ($scope,$convert,$q,gconfig,$filter,$location,$routeParams,$http,$route,feeListinfo) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.itemId=$routeParams.id;
    console.log("回填信息"+$routeParams.id);

    $scope.feeListInfo=feeListinfo.data;
    console.log( $scope.feeListInfo);
    console.log("费用名称");
    console.log( $scope.feeListInfo.name);

    //回退上一页
    $scope.back=function(){
        history.back();
    };
    //提交表单
    $scope.save=function(){
        delete $scope.feeListInfo.id;
        delete $scope.feeListInfo.name;
        $scope.feeListInfo.chargeItem ={id:$routeParams.id};

        console.log($scope.feeListInfo);
        if($scope.feeList.$valid){
            console.log($scope.feeListInfo);
            $http.post('chargeApply/saveChargeApply',$scope.feeListInfo).success(function(){
                alert("数据提交成功");
                history.back(); //返回上一页
            }).error(function(result){
                console.log(result);
                $scope.errorMessage = result.message;
            })
        }else{
            alert("表单提交失败");
        }
    }
}])