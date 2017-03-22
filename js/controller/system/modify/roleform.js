/**
 * Created by Administrator on 2017/3/17 0017.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/roleform',{
        template:require("./html/roleform.html"),
        controller:"roleform",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }],
            roleformcheck:["$http","$route",function ($http,$route) {
                return $http.get("/rolee/toadd/" )
            }]
        }
    })
}])
app.controller("roleform", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http","roleformcheck", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http,roleformcheck) {


    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //返回
    $scope.back=function(){
        history.back();
    };
    $scope.checkboxs=roleformcheck.data;

    //一级菜单控制二级菜单显示隐藏
    $scope.menu=false;
    $scope.toggle=function(x){
        var idnum=x.toString().length;
         console.log("菜单id"+x);
         if(idnum<2){
             alert("一级菜单");

         }else{alert("二级菜单")}
    };

    //定义表单ng-model中的对象
    $scope.roleform={ };
    //定义数组存贮选中的cheeckbox的id值
     var arry=[];
    //给每个checkbox添加事件，添加id值到数组
    $scope.addcheck=function(x){
        var id=x;
        arry.push(x);
        return arry;
    };
    //提交表单
    $scope.save=function(){
         $scope.roleform.checkbox=arry;
        console.log($scope.roleform.checkbox);
        console.log($scope.roleform);

        if($scope.menu.$valid){
            console.log($scope.roleform);
            $http.post('rolee/save',$scope.roleform).success(function(data){
                alert("数据提交成功");
                $scope.back();
            })
        }else{
            alert("表单提交失败");
        }
    }
}])