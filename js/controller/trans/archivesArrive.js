/**
 * Created by peter on 2017/4/6.
 */

var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/arrive',
        {
            controller:"archivesArrive",
            template:require("./html/archivesArrive.html")
        })
}])
app.controller("archivesArrive",["$scope","$location","$rootScope","Archives",function($scope,$params,$rootScope,archives){
    $rootScope.subTitle = "提档资料录入"
    $scope.records = {}
    $scope.status = {}
    $scope.archivesNo = ""
    $scope.count = 0
    $scope.keyUp = function ($event) {
        if($event.keyCode == 13 && $scope.archivesNo){
            var record = new review({archivesNo:$scope.archivesNo,status:"1"})
            $scope.status[$scope.archivesNo] = {text:"正在录入",css:"default"}
            record.$save().then(function () {
                $scope.status[record.archivesNo] = {text:"成功",css:"success"}
                $scope.count +=1;
            },function (err) {
                $scope.status[record.archivesNo] = {text:"录入失败",css:"danger"}
            })
            $scope.records[record.archivesNo] = record
            $scope.archivesNo = ""
            console.log($scope.status)
        }
    }
    $scope.cancel = function (archivesNo) {
        var record = $scope.records[archivesNo]
        if($scope.status[archivesNo].text == "通过"){
            $scope.status[archivesNo] = {text:"正在移除...",css:"default"}
            record.status = "0";
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