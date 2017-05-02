/**
 * Created by 10973 on 2017/4/26.
 */
/**
 * Created by Administrator on 2017/4/10 0010.
 */
/**
 * Created by Administrator on 2017/3/3 0003.
 */
/**
 * Created by liu on 2017/3/03.
 */
"use strict"
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/carlist',{
        template:require("./html/archives/carList.html"),
        controller:"carListCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("carListCtrl", ["$scope","TransRecord","$convert","$q","$printer","gconfig","$bill","$filter","$location","$routeParams","$http" ,function ($scope,$trans,$convert,$q,$printer,gconfig,$bill,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    //获取交接市场
    $scope.getUser=function(){
        $http.get('archives//plate/findAppUser').success(function(data){
            $scope.appUser=data.appUser;
        }).error(function(result){
           console.log('失败');
        })
    };
    $scope.getUser();
    //获取分页表
    $scope.tableColumns = [
        {title:"序号",template:"{{$parent.$index}}", width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"黄牌",template:"",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"蓝牌",template:"√",thClass:"text-center",tdClass:"text-center", width:10},
        {title:"摩托车",template:"",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"车号",template:"{{row.plateNumber}}",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"市场经手人",template:"",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"车管所接收",template:"",width:10,thClass:"text-center",tdClass:"text-center"},
        {title:"备注",template:"",width:20,thClass:"text-center",tdClass:"text-center"}

    ];
    //定义查询对象
    $scope.searchinfo={};

    //搜索按钮查询
    $scope.SearchTime=function(){
        $scope.searchinfo.startTime=$filter('date')($scope.startTime,'yyyy-MM-dd ');
        $scope.searchinfo.endTime=$filter('date')($scope.endTime,'yyyy-MM-dd ');
        $scope.ngTable.reload();
    };
    //进入打印页面
    $scope.data={
        ConnectTime:''
    };
    $scope.printTable=function(){
        $scope.data.ConnectTime=$filter('date')($scope.ConnectTime,'yyyy-MM-dd ');
        window.open('kpis/archivesList?signTime='+$scope.data.ConnectTime);
    }
}]);
