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
        $scope.seller = step2;
        $scope.middleMan =String($scope.seller.index);
    })
    Step.get({step:"step1"},function(step1,header){
        $scope.step1 = step1;
        $http.get("/batch/middleMan/"+$scope.step1.staff).then(function (result) {
            $scope.middleMans = result.data;
        })
    })
    $scope.middleMan='-1';
    //填充商贩信息
    $scope.getMiddleMan = function (i) {
        $scope.middle = $scope.middleMans[i];
        if($scope.middle){
            $scope.seller.idcardName = $scope.middle.name;
            $scope.seller.idcardAddress = $scope.middle.address;
            $scope.seller.idcardLimitEnd = $scope.middle.endTime;
            $scope.seller.idcardNo = $scope.middle.certCode;
            $scope.seller.cert = $scope.middle.idCardFront.path;
            $scope.seller.certBg = $scope.middle.idCardBg.path;
            $scope.seller.middleMan = $scope.middle.id;
            $scope.seller.consignationType='01';
        }else{
            $scope.seller.idcardName = '';
            $scope.seller.idcardAddress = '';
            $scope.seller.idcardLimitEnd = '';
            $scope.seller.idcardNo = '';
            $scope.seller.cert = '';
            $scope.seller.certBg = '';
            $scope.seller.middleMan = '';
        }
    }
    //填充委托人
    $scope.getTrustor = function (i) {
        $scope.trustor =  $scope.middleMans[i];
        if($scope.trustor){
            $scope.seller.trustorCert = $scope.trustor.idCardFront.path;
            $scope.seller.trustorCertBg = $scope.trustor.idCardBg.path;
        }else{
            $scope.seller.trustorCert = '';
            $scope.seller.trustorCertBg = '';
        }
    }
	// 证件类型:01身份证 02居住证 03临时身份证 04港澳台通行证 05军官证 06护照 07营业执照（三证合一） 08组织机构代码证
	$scope.seller = {
        certType: "01",
        consignationType: "01"
    };
	$scope.status = {};
	//拍照
    $scope.webcamWidth='280px';
    $scope.webcamHeight='150px';
    $scope.webcamTrue=true;
    //点击放大图片，摄像头的显示
    $scope.imgViewEnd=function(data){
        $webcam.show($scope.webcamWidth,$scope.webcamHeight,$scope.webcamTrue);
    };
    $scope.imgViewEnd();
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
    $scope.$watch("seller.certType",function(val){
        $scope.active = 1;
        switch(val){
            case "01":
                $scope.certCount = 2;
                $scope.certs = ["cert","certBg"];
                //$scope.middleMan='-1';
                $scope.seller.consignationType='01';
                break;
            case "02":
                $scope.certCount = 2;
                $scope.certs = ["residence","residenceBg"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='01';
                break;
            case "03":
                $scope.certCount = 4;
                $scope.certs = ["temporary1","temporary2","temporary3","temporary4"];
                $scope.middleMan ='-1';
                $scope.seller.consignationType='01';
                break;
            case "04":
                $scope.certCount = 2;
                $scope.certs = ["pass","passBg"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='01';
                break;
            case "05":
                $scope.certCount = 1;
                $scope.certs = ["military"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='01';
                break;
            case "06":
                $scope.certCount = 3;
                $scope.certs = ["passport1","passport2","passport3"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='01';
                break;
            case "07":
                $scope.certCount = 1;
                $scope.certs = ["business"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='02';
                break;
            case "08":
                $scope.certCount = 1;
                $scope.certs = ["organization"];
                $scope.middleMan = '-1';
                $scope.seller.consignationType='02';
                break;
        }
        $scope.status = {};
    });
    $scope.$watch("seller.consignationType",function(val){
        switch(val) {
            case "02":
                $scope.trustorCount = 3;
                $scope.trustorCerts = ["trustorCert","trustorCertBg","proxy"];
                break;
            case "01":
                $scope.trustorCount = 0;
                $scope.trustorCerts = [];
                break;
        }
        $scope.status = {};
    })
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
    // 证件模板
    $tpc.put("sellerCert01",require("./html/in/sellerCert01.html"));
    $tpc.put("sellerCert02",require("./html/in/sellerCert02.html"));
    $tpc.put("sellerCert03",require("./html/in/sellerCert03.html"));
    $tpc.put("sellerCert04",require("./html/in/sellerCert04.html"));
    $tpc.put("sellerCert05",require("./html/in/sellerCert05.html"));
    $tpc.put("sellerCert06",require("./html/in/sellerCert06.html"));
    $tpc.put("sellerCert07",require("./html/in/sellerCert07.html"));
    $tpc.put("sellerCert08",require("./html/in/sellerCert08.html"));
    $tpc.put("sellerTrustor",require("./html/in/sellerTrustor.html"));
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
        $scope.seller.index=$scope.middleMan;
        console.log($scope.seller.index);
        var step = new Step($scope.seller);
        console.log($scope.seller);
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
        var count = 0 ;
        for(var i in $scope.certs){
            if($scope.seller[$scope.certs[i]]){
                count++;
            }
        }
        for(var j in $scope.trustorCerts){
            if($scope.seller[$scope.trustorCerts[j]]){
                count++;
            }
        }
        if(count == ($scope.certCount + $scope.trustorCount)){
            return false;
        }else{
            return true;
        }
    };
    $scope.listRadio=true;
//监听选择商户下拉框变化
    $scope.$watch("middleMan",function(val){
        var val=parseInt(val);
        if(val==!-1){
            $scope.seller.certType='01';
            $scope.listRadio=false;
        }else{
            $scope.listRadio=true;
        }
    })

}]);