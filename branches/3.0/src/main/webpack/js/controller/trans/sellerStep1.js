/**
 * Created by 扬 on 2016/10/8.
 */
"use strict"
var app = require("../../ngcommon")
require("../../service/printarea")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step1',{template:require("./html/seller/sellerStep1.html")})
}])

app.controller("transSellerStep1",["$scope","$rootScope","$location","sellerStep", "$finger","$webcam","$uibModal","Upload","$http","$routeParams",
    function($scope, $rootScope,$location,Step,$finger,$webcam,$uibModal,Upload,$http,$routeParams){
    if($routeParams.edit && $routeParams.archivesNo){
        $scope.edit = true
        $scope.archivesNo = $routeParams.archivesNo
        $http.get("/trans/seller/edit/" + $routeParams.archivesNo).then(function (result) {
            $scope.finger = result.data.finger
//            $scope.fingerData = result.data.fingerData
            $scope.photo = result.data.photo
        })
    }
    $rootScope.subTitle = "卖家录入"
    $webcam.show("280px","160px")
    $webcam.setRangeType(2)
    $scope.$on('$destroy', function() {
        $webcam.hide()
    })
    $scope.status = {}
    if(!$scope.edit) {
        // 获取后台缓存数据
        Step.get({step: "step1"}, function (step1, header) {
            $scope.finger = step1.finger
            $scope.fingerData = step1.fingerData
            $scope.photo = step1.photo
        })
    }
    $scope.snapshot = function () {
        $scope.status.photo = "正在拍照上传..."
        $webcam.upload(function (success,filename) {
            if(success){
                $scope.$apply(function () {
                    $scope.photo = filename
                })
            }else{
                $scope.status.photo = "拍照上传失败"
            }
        })
    }
    $scope.upload = function($file,type){
        $scope.status[type] = "正在上传..."
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope[type] = ret.data
            },
            function (err) {
                console.log(err)
            },
            function (evt) {
                console.log(evt)
            }
        )
    }
    $scope.fingerPrint = function () {
        $scope.status.finger = "正在采集指纹..."
        $finger.read(function (success,filename,data) {
            $scope.$apply(function () {
                if(success){
                    $scope.finger = filename
                    $scope.fingerData = data
                }
                else{
                    $scope.status.finger = "采集指纹失败"
                }
            })
        })
    }
    $scope.error = function () {
        if(this.photo && this.finger) return false
        return true
    }
    $scope.next = function () {
        // 新增
        $scope.submiting = true
        var step1 = new Step({
            finger: $scope.finger,
            photo: $scope.photo,
            fingerData: $scope.fingerData,
            archivesNo:$scope.archivesNo
        })
        step1.$save({step:"step1"}).then(function(result){
            $location.path("/trans/seller/step2")
            $scope.submiting = false
            window.scrollTo(0,0)
        },function (error) {
            $scope.submiting = false
        })
    }
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + window.encodeURI(path)
    }
    // 打印确认书
    $scope.confirmPreview = function () {
//        if($scope.error()) return false
        if($scope.archivesNo){
            openConfirmPreview()
        }
        else {
            $http.get("/trans/archivesNo/new").then(function (result) {
                $scope.archivesNo = result.data.message
                openConfirmPreview()
            }, function () {
            })
        }
    }
    function openConfirmPreview () {
        $webcam.hide()
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require("./html/print/sellerConfirm.html"),
            controller: "printModalController",
            controllerAs: "$ctrl",
            resolve: {
                data: function () {
                    return {photo:$scope.photo,imgSrc:$scope.imgSrc,finger:$scope.finger,archivesNo:$scope.archivesNo}
                }
            },
            size:"lg"
        })
        modalInstance.result.then(function(){
            $webcam.show()
        },function (printed) {
            $webcam.show()
            $scope.printed = printed
        })
    }
}])

app.controller("printModalController",["$uibModalInstance","data","$http","$scope","$print",function($uibModalInstance,data,$http,$scope,$print){
    var $ctrl = this
    $ctrl.photo = data.photo
    $ctrl.imgSrc = data.imgSrc
    $ctrl.finger = data.finger
    $ctrl.archivesNo = data.archivesNo
    $ctrl.printed = true
    $ctrl.close = function () {
        $uibModalInstance.dismiss($ctrl.printed)
    }
    $ctrl.print = function (event) {
        $('#printArea').printArea({})
//        $print.init()
//        $print.printArea(document.getElementById("printArea"),0,40,800,1200)
        $ctrl.printed = true
//        this.close()
    }

}])