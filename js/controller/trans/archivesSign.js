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
    $scope.plateNumber = "鄂A";
    $scope.keyUp = function ($event) {
        if($event.keyCode == 13){
            if($scope.plateNumber !="鄂A"){
                var arc = new archives();
                arc.$save({action:"findByPlateNumber",plateNumber:$scope.plateNumber}).then(function (data) {
                    $scope.archivesNo = data.archivesNo;
                    getArchives($scope.archivesNo);
                },function (err) {
                    $scope.status[record.archivesNo] = {text:"签收失败",css:"danger"}
                });
            } else {
                getArchives($scope.archivesNo);
            }
        }
    };
    function getArchives(arg) {
        var record = new archives({archivesNo:arg,status:"3"});
        $scope.status[$scope.archivesNo] = {text:"正在签收",css:"default"};
        record.$save().then(function () {
            $scope.status[record.archivesNo] = {text:"已签收",css:"success"};
            $scope.count +=1;
            $scope.plate_number=false;
            $scope.plateNumber = "鄂A";
        },function (err) {
            $scope.status[record.archivesNo] = {text:"签收失败",css:"danger"}
        })
        $scope.records[record.archivesNo] = record;
        $scope.archivesNo = "";
    }
    $scope.cancel = function (archivesNo) {
        var record = $scope.records[archivesNo]
        if($scope.status[archivesNo].text == "已签收"){
            $scope.status[archivesNo] = {text:"正在取消...",css:"default"}
            record.status = "4";
            record.$save().then(function () {
                delete $scope.records[archivesNo]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.archivesNo] = {text:"取消失败",css:"danger"}
            })
        }else{
            delete $scope.records[archivesNo]
        }
    }
    //按照车牌号查询
    $scope.plate_number=false;
    $scope.showPlate=function(){
            $scope.plate_number=true;
    };
}])