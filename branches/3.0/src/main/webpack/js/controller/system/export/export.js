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
    $routeProvider.when('/system/export',{
        template:require("./html/export.html"),
        controller:"stytemExportCtrl",
        resolve: {
            gconfig:["$globalConfig",function (config) {
                return config
            }]
        }
    })
}])
app.controller("stytemExportCtrl", ["$scope","$convert","$q","$printer","gconfig","$filter","$location","$routeParams","$http" ,function ($scope,$convert,$q,$printer,gconfig,$filter,$location,$routeParams,$http) {
    //页面跳转
    $scope.jump=function(path){
        $location.path(path);
    };
    $scope.$watch('archivesNo',function (val) {
        console.log("监听ing");
        console.log(val);
        // $http.post('trans/exportTransRecord?archivesNo='+val,{responseType:'arraybuffer'}).then(function (response) {
        //     console.log("成功");
        //     var blob = new Blob([response.data], { type: 'application/zip' });
        //     saveAs(blob, 'reports.zip');
        //
        // },function (err) {
        //     cosole.log(err);
        //     // console.log(err.message);
        // })

        //
        // $http({
        //     url: 'trans/exportTransRecord?archivesNo='+val,
        //     method: "GET",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     // params: val,
        //     responseType: 'arraybuffer'
        // }).success(function (data) {
        //     var blob = new Blob([data], {type: "application/octet-stream"});
        //     var objectUrl = URL.createObjectURL(blob);
        //     var filename="报表1"+'.zip';
        //     if (window.navigator.msSaveOrOpenBlob) {// For IE:
        //         navigator.msSaveBlob(blob, filename);
        //     }else{ // For other browsers:
        //         URL.revokeObjectURL(objectUrl);
        //     }
        // }).error(function(data){
        //     // alert(data.message);
        // });

        // var model = $scope.selection;
        var res = $http.post('trans/exportTransRecord?archivesNo='+val,{responseType:'arraybuffer'});

        res.success(function (response, status, headers, config) {
            // saveAs(new Blob([response], { type: "application/octet-stream", responseType: 'arraybuffer' }), 'reports.zip');
            // notificationFactory.success();
            var a = document.createElement('a');
            var blob = new Blob([response], {'type':"application/octet-stream"});
            a.href = URL.createObjectURL(blob);
            a.download = "filename.zip";
            a.click();
        });
    })



}]);