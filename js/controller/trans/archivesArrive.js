/**
 * Created by peter on 2017/4/6.
 */

var app = require("../../ngcommon")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/arrive',
        {
            controller:"archivesArrive",
            template:require("./html/archives/archivesArrive.html")
        })
}])
app.controller("archivesArrive",["$scope","$location","$rootScope","Archives",function($scope,$params,$rootScope,archives){
    $rootScope.subTitle = "提档资料录入";
    $scope.records = {};
    $scope.status = {};
    $scope.plateNumber = "鄂A";
    $scope.count = 0;
    $scope.keyUp = function ($event) {
        if($event.keyCode == 13 && $scope.plateNumber){
            var record = new archives({plateNumber:$scope.plateNumber,status:"1"});
            console.log($scope.plateNumber);
            $scope.status[$scope.plateNumber] = {text:"正在录入",css:"default"}
            record.$save().then(function () {
                $scope.status[record.plateNumber] = {text:"已回档",css:"success"}
                $scope.count +=1;
            },function (err) {
                $scope.message = err.data.message;
                $scope.status[record.plateNumber] = {text:"录入失败",css:"danger"}
            })
            $scope.records[record.plateNumber] = record
            $scope.plateNumber = "鄂A"
            console.log($scope.status)
        }
    }
    $scope.cancel = function (plateNumber) {
        var record = $scope.records[plateNumber]
        if($scope.status[plateNumber].text == "已回档"){
            $scope.status[plateNumber] = {text:"正在移除...",css:"default"}
            record.status = "0";
            record.$save().then(function () {
                delete $scope.records[plateNumber]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.plateNumber] = {text:"移除失败",css:"danger"}
            })
        }else{
            delete $scope.records[plateNumber]
        }
    }
}])