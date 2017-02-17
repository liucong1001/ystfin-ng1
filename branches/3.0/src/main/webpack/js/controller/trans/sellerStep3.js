/**
 * Created by 扬 on 2016/10/11.
 */
var app = require("../../ngcommon")
var $ = require("jquery")

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/trans/seller/step3',{
        template:require("./html/seller/sellerStep3.html"),
        controller:"transSellerStep3",
        resolve: {
            sessionSeller: ["$seller", "$route", function ($seller) {
                return $seller.get("/seller").$promise
            }],
            gconfig:["$globalConfig",function (config) {
                return config
            }],
        }
    })
}])
app.controller("transSellerStep3",["$scope","$rootScope","$location","$webcam","$seller","Upload","$routeParams","sessionSeller","gconfig",
function($scope,$rootScope,$location,$webcam,$seller,Upload,$routeParams,sessionSeller,gconfig){
    $webcam.show("280px","160px")
    $webcam.setRangeType(0)
    $scope.tr = sessionSeller

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
                    $scope.imgs.push("temp/" + filename)
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
                $scope.imgs.push("temp/" + ret.data)
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.active = $scope.imgs.length - 1
                    })
                }, 500)
            },
            function (err) {
                console.log(err)
            },
            function (evt) {
                console.log(evt)
            }
        )
    }
    $scope.next = function () {
        $scope.submiting = true
        var seller = new $seller({files:$scope.imgs})
        seller.$save({step:"step3"}).then(function(result){
            $scope.submiting = false
            $webcam.hide()
            if(gconfig.toType){
                $location.path("/trans/seller/type/" + result.id)
            }else{
                $location.path("/trans/seller/complate/提交成功")
            }
            window.scrollTo(0,0)
        },function (err) {
            $scope.submiting = false
            $rootScope.viewMask = false
            $scope.errorMessage = "提交失败!" + err.data.message
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
}])