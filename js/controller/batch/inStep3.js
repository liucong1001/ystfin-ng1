/**
 * Created by peter on 2017/1/18.
 */
"use strict";
var app = require("../../ngcommon");

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/batch/in/step3",{
        controller:"batchStep3Controller",
        template:require("./html/in/step3.html")
    });
}]);

app.controller("batchStep3Controller",["$scope","$http","$location","batchInStep","$templateCache","$webcam","Upload",function ($scope,$http,$location,Step,$tpc,$webcam,Upload) {
    // 获取后台缓存数据
    Step.get({step:"step3"},function (step3,header) {
        $scope.vehicle= step3
    })

    $scope.vehicle = {
        items:[{'vehicleCert':'','vehicleCertBg':'','registrationCert':'','registrationCertBg':''}]
    };
    $scope.status = {};
    $scope.i = 0;
    //添加车辆
    $scope.addVehicle = function () {
        var i = $scope.i;
        $scope.vehicle.items.push( {'vehicleCert':'','vehicleCertBg':'','registrationCert':'','registrationCertBg':''});
        console.log($scope.vehicle.items);
        i++;
        $scope.i = i;
    }
    //修改车辆
    /*$scope.editVehicle = function (i) {
        var vehicle = $scope.vehicle.items[i];

        $scope.i = i;
    }*/
    //拍照
    $webcam.show("280px","150px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
        $webcam.hide();
    });
    $scope.snapshot = function (img,index,xuanzhuan,i) {
        $scope.status[img] = "正在拍照上传..."
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
                $scope.vehicle.items[i][img] = filename
            });
        },xuanzhuan);
        $scope.active = index + 1;
    }
    $scope.upload = function($file,type,index,i){
        $scope.status[type] = "正在上传...";
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope.vehicle.items[i][type] = ret.data
            },
            function (err) {
                console.log(err);
            },
            function (evt) {
                console.log(evt);
            }
        );
    };

    //显示图片
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + path;
    };

    //返回上一步
    $scope.prev = function () {
        var step = new Step($scope.vehicle)
        step.$save({step:"step3"});
        $location.path("/batch/in/step2");
        window.scrollTo(0,0);
    };

    //判断是否可点击下一步
    $scope.error = function () {
        if($scope.i > 0) {
            return false;
        }else{
            return true;
        }
    };

    //下一步
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step($scope.vehicle);
        step.$save({step:"step3"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/step4");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };

}]);