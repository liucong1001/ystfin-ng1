/**
 * Created by 10973 on 2017/6/24.
 */

var app = require("../../ngcommon");
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/archives/send',
        {
            controller:"archivesSend",
            template:require("./html/archives/archivesSend.html")
        })
}]);
app.controller("archivesSend",["$scope","$location","$rootScope","Archives","$http",function($scope,$params,$rootScope,archives,$http){
    $rootScope.subTitle = "提档档案送出";
    $scope.records ={};
    $scope.status = {};
    $scope.archivesNo = "";
    $scope.archivesCode="";  //码和流水号一起28位数据
    $scope.count = 0;
    $scope.plateNumber = "鄂A";
    $scope.AutoSearch=function(code){
        if(GetLength(code)==29){
            var  ma=code.substring(0,13); //车管所13位码
            var  arcNo=code.substring(13,29); //交易流水号
            var arc = new archives();
            arc.$save({action:"findByArchives",archivesNo:arcNo}).then(function (data) {
                           $scope.plateNumber = data.vehicle.plateNumber;
                            getArchives(arcNo,$scope.plateNumber,ma);
                        },function (err) {

                        });
        }else{
            $scope.AutoSearch_plat();
        }
    };

    //档案自提按车牌号
    $scope.AutoSearch_plat=function(i){
        if((GetLength($scope.plateNumber)==8||GetLength($scope.plateNumber)==9)&&GetLength($scope.archivesCode)==13){
                   getArchives(null,$scope.plateNumber,$scope.archivesCode);
                    $scope.plateNumber ="鄂A";
                }
    };

    //获取字符串长度
    function GetLength(str){
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }

    function getArchives(arg,plat,codema) {
        var record = new archives({archivesNo:arg,plateNumber:plat,code:codema,status:"6"});
        $scope.status[$scope.plateNumber] = {text:"正在送出",css:"default"};
        record.$save().then(function () {
            $scope.status[record.plateNumber] = {text:"已送出",css:"success"};
            $scope.count +=1;
            $scope.plateNumber = "鄂A";
        },function (err) {
            $scope.message = err.data.message;
            $scope.status[record.plateNumber] = {text:"送出失败",css:"danger"}
        })
        $scope.archivesCode = "";
        $("#archivesCode").focus();
        $scope.records[record.plateNumber] = record;
    }
    $scope.cancel = function (plateNumber) {
        var record = $scope.records[plateNumber];
        if($scope.status[plateNumber].text == "已送出"){
            $scope.status[plateNumber] = {text:"正在取消...",css:"default"}
            record.status = "7";
            record.$save().then(function () {
                delete $scope.records[plateNumber]
                if($scope.count>0){
                    $scope.count -=1;
                }
            },function (err) {
                $scope.status[record.plateNumber] = {text:"取消失败",css:"danger"}
            })
        }else{
            delete $scope.records[plateNumber]
        }
    };
    //按照车牌号查询
    $scope.plate_number=false;
    $scope.showPlate=function(){
        $scope.plate_number=true;
    };
    //黄牌标记

    $scope.signYellow=function(x){
        if(confirm("是否确定黄牌标记此车")){
            $http.post('/archives/yellowMark?archivesNo='+x).success(function () {

            })
        }


    }
}])
app.filter('toArray', function () {
    return function (obj, addKey) {
        if (!angular.isObject(obj)) return obj;
        if ( addKey === false ) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
        } else {
            return Object.keys(obj).map(function (key) {
                var value = obj[key];
                return angular.isObject(value) ?
                    Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
                { $key: key, $value: value };
            });
        }
    };
});
