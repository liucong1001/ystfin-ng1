/**
 * Created by Administrator on 2017/3/3 0003.
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
    $routeProvider.when('/system/managerform',{
        template:require("./html/managerform.html"),
        controller:"managerformCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}]);
app.controller("managerformCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http) {

    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //定义对象
    $scope.user={ };
    //表单错误信息出现的控制变量
    $scope.userNameerror=false;
    $scope.passworderror=false;
    $scope.repassworderror=false;
    //返回
    $scope.back=function(){
        history.back();
    };
    //初始化默select默认选中
    $scope.user.type='02';
   //提交表单
    $scope.save=function(){
        if($scope.userForm.$valid){
            $http.post('admin/save',$scope.user).success(function(data){
                alert("数据保存成功");
                $scope.back();  //返回
            });
        }else{
            alert("表单提交失败");
        }
    }
}])