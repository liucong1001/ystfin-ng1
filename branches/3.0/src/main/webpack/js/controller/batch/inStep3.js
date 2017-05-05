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
    Step.get({step:"step3"},function (step3) {
        $scope.vehicle= step3
        $scope.i = 0;
    })
    $scope.vehicle = {
        items:[{'vehicleCert':'','vehicleCertBg':'','registrationCert':'','registrationCertBg':'','images':[]}]
    };
    $scope.status = {};
    $scope.i = 0;
    $scope.showFilter = true;
    //添加车辆
    $scope.addVehicle = function () {
        var i = $scope.vehicle.items.length;
        $scope.vehicle.items.push( {'vehicleCert':'','vehicleCertBg':'','registrationCert':'','registrationCertBg':'','images':[]});
        $scope.status = {};
        $scope.i = i;
    }
    //删除车辆
    $scope.removeVehicle = function (i) {
        $scope.vehicle.items.splice(i,1);
        i--;
        $scope.i = i;
    }
    //修改车辆
    $scope.editVehicle = function (i) {
        var vehicle = $scope.vehicle.items[i];
        $scope.i = i;
    }
    //拍照
    $scope.webcamWidth='280px';
    $scope.webcamHeight='170px';
    $scope.webcamTrue=true;
    $webcam.show($scope.webcamWidth,$scope.webcamHeight,$scope.webcamTrue);
    //点击放大图片，摄像头的显示
    $scope.imgViewEnd=function(data){
        $webcam.show($scope.webcamWidth,$scope.webcamHeight,$scope.webcamTrue);
    };
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
    //上传
    $scope.upload = function($file,type,i){
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

    //相册处理
    $scope.myInterval = 0
    $scope.noWrapSlides = false
    $scope.activeImgs = 0
    $scope.goto = function (index) {
        $scope.activeImgs = index
    }
    $scope.nextImg = function () {
        if($scope.activeImgs >= $scope.vehicle.items[i]['images'].length - 1){
            return
        }
        $scope.activeImgs++
    }
    $scope.prevImg = function () {
        if($scope.activeImgs <= 0){
            return
        }
        $scope.activeImgs--
    }
    //删除当前图片
    $scope.remove = function (index,i) {
        if(index){
            index--
        } else {
            index = $scope.activeImgs

        }
        $scope.vehicle.items[i]['images'].splice(index,1)
        if($scope.activeImgs >= $scope.vehicle.items[i]['images'].length - 1 && $scope.activeImgs > 0) $scope.activeImgs--
    }
    //拍照
    $scope.snapshotImgs = function (i) {
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
                if(success){
                    $scope.vehicle.items[i]['images'].push(filename)
                    setTimeout(function(){
                        $scope.$apply(function(){
                            $scope.activeImgs = $scope.vehicle.items[i]['images'].length-1
                        })
                    },500)
                }
            })
        })
    }
    //上传
    $scope.uploadImgs = function($file,i){
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope.vehicle.items[i]['images'].push(ret.data)
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.activeImgs = $scope.vehicle.items[i]['images'].length-1
                    })
                },500)
            },
            function (err) {
                console.log(err)
            },
            function (evt) {
                console.log(evt)
            }
        )
    }

    //显示图片
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + path;
    };
    //下一步
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step($scope.vehicle);
        step.$save({step:"step3"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/complete/123456789");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };
    //返回上一步
    $scope.prev = function () {
        var step = new Step($scope.vehicle)
        step.$save({step:"step3"});
        $location.path("/batch/in/step2");
        window.scrollTo(0,0);
    };
    //判断是否能下一步
    $scope.error = function () {
        for(var i in $scope.vehicle.items){
            if(!$scope.vehicle.items[i]['vehicleCert']
                ||!$scope.vehicle.items[i]['vehicleCertBg']
                ||!$scope.vehicle.items[i]['registrationCert']
                ||!$scope.vehicle.items[i]['registrationCertBg'])
            {
                return true;
            }
        }
        return false;
    };


}]);