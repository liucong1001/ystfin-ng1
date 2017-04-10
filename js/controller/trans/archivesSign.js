/**
 * Created by Administrator on 2017/4/10 0010.
 */
var app = require("../../ngcommon");
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/sign',
        {
            controller:"archivesSign",
            template:require("./html/archives/archivesSign.html")
        })
}]);
app.controller("archivesSign",["$scope","$location","$rootScope","Archives",function($scope,$params,$rootScope,archives){
    $rootScope.subTitle = "原车主审核";
    $scope.records = {};
    $scope.status = {};
    $scope.archivesNo = "";
    $scope.count = 0;
    $scope.keyUp = function ($event) {
        if($event.keyCode == 13 && $scope.archivesNo){
            var record = new archives({archivesNo:$scope.archivesNo,status:"3"})
            $scope.status[$scope.archivesNo] = {text:"正在提交",css:"default"}
            record.$save().then(function () {
                $scope.status[record.archivesNo] = {text:"通过",css:"success"}
                $scope.count +=1;
            },function (err) {
                $scope.status[record.archivesNo] = {text:"提交失败",css:"danger"}
            })
            $scope.records[record.archivesNo] = record
            $scope.archivesNo = ""
            console.log($scope.status)
        }
    };
    $scope.cancel = function (archivesNo) {
        var record = $scope.records[archivesNo]
        if($scope.status[archivesNo].text == "通过"){
            $scope.status[archivesNo] = {text:"正在移除...",css:"default"}
            record.status = "4";
            record.$save().then(function () {
                delete $scope.records[archivesNo]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.archivesNo] = {text:"移除失败",css:"danger"}
            })
        }else{
            delete $scope.records[archivesNo]
        }
    }
}])