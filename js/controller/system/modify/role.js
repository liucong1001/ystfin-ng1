/**
 * Created by Administrator on 2017/3/17 0017.
 */
/**
 * Created by Administrator on 2017/3/8 0008.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/system/role',{
        template:require("./html/role.html"),
        controller:"role",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("role", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$http","$routeParams", function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$http,$routeParams) {
    //定义页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //定义表单ng-model中的对象
    //$scope.role={
    //    "cityId":$routeParams.id
    //};
    //定义查询对象
    $scope.searchinfo={};

    $scope.tableColumns = [
        //{title:"ID",template:"{{row.id}}", thClass:"text-right",tdClass:"text-right", width:10},
        {title:"NAME",template:"{{row.name }}",thClass:"text-center",tdClass:"text-center", width:20},
        {title:"TYPE",template:"{{row.type}}",width:10,thClass:"text-left",tdClass:"text-left"},
        //{title:"",template:"<a href='/ng#/system/roleinfo?id={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"},
        {title:"",template:"<a href='/ng#/system/roleinfo?id={{row.id}}'>修改</a>",width:10,thClass:"text-left",tdClass:"text-left"}

    ]
    //删除
    $scope.ngTable = {reset:function (id) {
        if(confirm("是否确定删除？")){
            $http({
                method:'post',
                url:'admin/resetPwd',
                params:{'id':id}
            }).success(function(){ alert("删除成功！");})
        }
    }}
    //提交表单
    $scope.save=function(){
        if($scope.role.$valid){
            //alert("提交表单成功");
            console.log($scope.role);
            $http.post('citys/city/save',$scope.role).success(function(data){
                alert("数据提交成功");
                $location.path('system/transcityService'); //返回上一页
            })
        }else{
            alert("表单提交失败");
        }
    }
}]);