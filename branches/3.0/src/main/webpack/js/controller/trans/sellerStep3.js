/**
 * Created by 扬 on 2016/10/11.
 */
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step3',{template:require("./html/seller/sellerStep3.html")})
}])
app.controller("transSellerStep3",["$scope","$rootScope","$location","$webcam","sellerStep","Upload","$routeParams",function($scope,$rootScope,$location,$webcam,Step,Upload,$routeParams){
    $webcam.show("280px","160px")
    $webcam.setRangeType(0)

    $scope.imgs = []
    $scope.myInterval = 0
    $scope.noWrapSlides = false
    $scope.active = 0
    $scope.goto = function (index) {
        $scope.active = index
    }
    $scope.nextImg = function () {
        if($scope.active >= $scope.imgs.length - 1){
            return
        }
        $scope.active++
    }
    $scope.prevImg = function () {
        if($scope.active <= 0){
            return
        }
        $scope.active--
    }
    $scope.snapshot = function () {
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
                if(success){
                    $scope.imgs.push(filename)
                    setTimeout(function(){
                        $scope.$apply(function(){
                            $scope.active = $scope.imgs.length-1
                        })
                    },500)
//                    $('.carousel').carousel()
                }
            })
        })
    }
    $scope.upload = function($file){
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope.imgs.push(ret.data)
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.active = $scope.imgs.length-1
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
    // 获取后台缓存数据
    Step.get({step:"step3"},function (step3,header) {
        $scope.imgs= step3.images
    })
    $scope.next = function () {
        $scope.submiting = true
        var step = new Step({images:$scope.imgs})
        var method = $routeParams.edit?step.$update:step.$save
        method.call(step,{step:"finally"}).then(function(result){
            $scope.submiting = false
            $webcam.hide()
            $location.path("/trans/seller/complate/" + result.message)
            window.scrollTo(0,0)
        },function (err) {
            $scope.submiting = false
            $rootScope.viewMask = false
        })
    }
    $scope.prev = function () {
        var step = new Step({images:$scope.imgs})
        step.$save({step:"step3"})
        $location.path("/trans/seller/step2")
        window.scrollTo(0,0)
    }
    $scope.remove = function (index) {
        if(index){
            index--
        }
        else{
           index = $scope.active
        }
        $scope.imgs.splice(index,1)
        if($scope.active >= $scope.imgs.length - 1 && $scope.active > 0) $scope.active--
    }
    $scope.imgSrc = function (path) {
        return "/common/download/temp?file=" + window.encodeURI(path)
    }
}])