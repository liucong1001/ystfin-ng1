/**
 * Created by Administrator on 2017/3/9 0009.
 */

/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/addCode',{
        template:require("./html/addCode.html"),
        controller:"addCode",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("addCode", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http","$routeParams", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http,$routeParams) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    }
    //回退上一页
    $scope.back=function(){
        history.back();
    };
    //接受路由后面的值
    $scope.val=$routeParams.codemap;
    //定义表单ng-model中的对象
    $scope.addCode_in={"codemap":$scope.val};
    //提交表单
    $scope.save=function(){
        if($scope.addCode.$valid){
            console.log($scope.addCode_in);
            $http.post('cod/item/save',$scope.addCode_in).success(function(){
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