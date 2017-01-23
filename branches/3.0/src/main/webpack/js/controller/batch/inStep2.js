/**
 * Created by peter on 2016/11/29.
 */
"use strict";
var app = require("../../ngcommon");

app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/batch/in/step2",{
        controller:"batchStep2Controller",
        template:require("./html/in/step2.html")
    });
}]);

app.controller("batchStep2Controller",["$scope","$http","$location","batchInStep","$templateCache","$webcam","$idcard","$finger","Upload",function ($scope,$http,$location,Step,$tpc,$webcam,$idcard,$finger,Upload) {
	// 获取后台缓存数据
    Step.get({step:"step2"},function (step2,header) {
        $scope.seller = step2
        $scope.middleMan = $scope.seller.middleMan;
    })
    Step.get({step:"step1"},function(step1,header){
        $scope.step1 = step1
        $http.get("/batch/middleMan/"+$scope.step1.staff).then(function (result) {
            $scope.middleMans = result.data;
        })
    })
    //填充商贩信息
    $scope.getMiddleMan = function () {
        $http.get("/middleman/"+$scope.middleMan).then(function (result) {
            $scope.middle = result.data;
            if($scope.middle){
                $scope.seller.idcardName = $scope.middle.name;
                $scope.seller.idcardAddress = $scope.middle.address;
                $scope.seller.idcardLimitEnd = $scope.middle.endTime;
                $scope.seller.idcardNo = $scope.middle.certCode;
                $scope.seller.cert = $scope.middle.idCardFront.path;
                $scope.seller.certBg = $scope.middle.idCardBg.path;
                $scope.seller.photo = $scope.middle.regPhoto.path;
                $scope.seller.finger = $scope.middle.fingerprintImg.path;
                $scope.seller.middleMan = $scope.middle.id;
            }else{
                $scope.seller.idcardName = '';
                $scope.seller.idcardAddress = '';
                $scope.seller.idcardLimitEnd = '';
                $scope.seller.idcardNo = '';
                $scope.seller.cert = '';
                $scope.seller.certBg = '';
                $scope.seller.photo = '';
                $scope.seller.finger = '';
                $scope.seller.middleMan = '';
            }
        })
    }
	// 证件类型:01 居民身份证 02  企业营业执照(三证合一) 03企业组织机构代码证（营业执照、税务登记证）
	$scope.seller = {
        certType: "01"         
    };
	$scope.status = {};
	//拍照
    $webcam.show("280px","150px",true)
    $webcam.setRangeType(0)
    $scope.$on('$destroy', function() {
    	$webcam.hide();
    });
	$scope.snapshot = function (img,index,xuanzhuan) {
        $scope.status[img] = "正在拍照上传..."
        $webcam.upload(function (success,filename) {
            $scope.$apply(function(){
                $scope.seller[img] = filename
            });
            
        },xuanzhuan);
        $scope.active = index + 1;
    }
    $scope.upload = function($file,type,index){
        $scope.status[type] = "正在上传...";
        Upload.upload({
            url:"/common/upload/single",
            file:$file
        }).then(function (ret) {
                $scope.seller[type] = ret.data
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
    // 设置证件数量
    $scope.certCount = 0;
    $scope.$watch("seller.certType",function(val,old){
        $scope.active = 1;
        switch(val){
            case "01":
                $scope.certCount = 3;
                $scope.certs = ["cert","certBg","photo","finger"];
                break;
            case "02":
                $scope.certCount = 1;
                $scope.certs = ["buslicense","photo","finger"];
                break;
            case "03":
                $scope.certCount = 3;
                $scope.certs = ["organization","buslicense","tax","photo","finger"];
                break;
        }
        $scope.status = {};
    });
    
    //身份证读卡器
    $scope.idcardReady = $idcard.init();
    $scope.readCard = function () {
        var idcard = $idcard.read();
        if(idcard){
            $scope.seller.idcardName = idcard.name;
            $scope.seller.idcardAddress = idcard.address;
            $scope.seller.idcardSex = idcard.sex;
            $scope.seller.idcardBirthday = idcard.birthday;
            $scope.seller.idcardLimitEnd = idcard.userLifeE;
            $scope.seller.idcardNo = idcard.cardNo;
            $scope.seller.idcardNation = idcard.nation;
        }
        $scope.active = 2;
    };
    //指纹仪
    $scope.fingerPrint = function () {
        $scope.status.finger = "正在采集指纹...";
        $finger.read(function (success,filename,data) {
            $scope.$apply(function () {
                if(success){
                    $scope.seller.finger = filename;
                    $scope.seller.fingerData = data;
                }
                else{
                    $scope.status.finger = "采集指纹失败";
                }
            });
        });
    };
    // 证件模板
    $tpc.put("sellerCert01",require("./html/in/sellerCert01.html"));
    $tpc.put("sellerCert02",require("./html/in/sellerCert02.html"));
    $tpc.put("sellerCert03",require("./html/in/sellerCert03.html"));
    //返回上一步
    $scope.prev = function () {
        var step = new Step($scope.seller)
        step.$save({step:"step2"});
        $location.path("/batch/in/step1");
        window.scrollTo(0,0);
    };
    //下一步
    $scope.next = function () {
        $scope.submiting = true;
        var step = new Step($scope.seller);
        step.$save({step:"step2"}).then(function(result){
            $scope.submiting = false;
            $location.path("/batch/in/step3");
            window.scrollTo(0,0);
        },function (error) {
            $scope.submiting = false;
        });
    };
    //判断是否可点击下一步
    $scope.error = function () {
        for(var i in $scope.certs){
            if(!$scope.seller[$scope.certs[i]]){
                return true
            }
        }
        return false
    };

}]);